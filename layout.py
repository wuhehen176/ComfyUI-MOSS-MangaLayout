"""Public compiler API, including imports kept for existing scripts and nodes."""
import copy
import json
import math
import re

if __package__:
    from .layout_schema import TEXT_REGIONS, dumps, integer, reject_constant, slot_type, valid_quad, validate_layout
    from .geometry import panel_index, frame_position, frames_overlap, slanted_quad, frame_corner_items, omitted_frames, page_guide
    from .instructions import format_instructions
else:
    from layout_schema import TEXT_REGIONS, dumps, integer, reject_constant, slot_type, valid_quad, validate_layout
    from geometry import panel_index, frame_position, frames_overlap, slanted_quad, frame_corner_items, omitted_frames, page_guide
    from instructions import format_instructions


def manual_source(layout):
    """Use shared descriptions in both modes; preserve explicit characters and text."""
    layout = validate_layout(layout)
    items = []
    for index, panel in enumerate(layout['panels']):
        panel_items = []
        for slot, note in panel.get('slotNotes', {}).items():
            entries = panel.get('slotContents', {}).get(slot, [])
            if note and not any(entry['label'] != 'text' and entry['caption'].strip() == note for entry in entries):
                label = 'character' if slot_type(slot) in ('S', 'L', 'R') else 'object'
                panel_items.append({'panel':index+1, 'slot':slot, 'label':label, 'caption':note})
        for slot, entries in panel.get('slotContents', {}).items():
            for entry in entries:
                caption, text = entry['caption'].strip(), entry.get('text', '')
                if entry['label'] == 'text':
                    if not text.strip():
                        if caption:
                            raise ValueError(f'第 {index+1} 格的 {slot} 已填写文字说明，请同时填写准确台词。')
                        continue
                    kind = entry.get('textType', 'dialogue')
                    if kind == 'sfx':
                        caption = (caption or 'Sound effect beside its sound source.') + ' Japanese handwritten sound effect, legible black lettering.'
                    else:
                        size = 'large' if sum(c.isalnum() for c in text) <= 5 else 'medium' if sum(c.isalnum() for c in text) <= 15 else 'small'
                        default = 'Narration in a white rectangular box with a thin black outline, printed black lettering.' if kind == 'narration' else 'An oval speech bubble, printed black lettering.'
                        caption = (caption or default) + f' Chinese lettering, reproduce the supplied text verbatim, {size} legible glyphs.'
                    panel_items.append({'panel':index+1, 'slot':slot, 'label':'text', 'caption':caption, 'text':text})
                elif caption:
                    panel_items.append({'panel':index+1, 'slot':slot, 'label':entry['label'], 'caption':caption})
        # Match the visual text path; preserve the list order inside one region.
        panel_items.sort(key=lambda item: ({'object':0, 'character':1, 'text':2}[item['label']], *(panel['slots'][item['slot']][:2] if item['label'] == 'text' else (0, 0))))
        items.extend(panel_items)
    if not items:
        if layout['description'].strip():
            return layout['description']
        raise ValueError('直接提示词模式尚未填写画面或台词。请在编辑器第二页为外框／内框添加内容。')
    caption = layout['description'].strip() or 'A full-color Japanese 2D comic page, clean lineart and soft cel shading.'
    return dumps({'summary':{'canvas':'single' if len(layout['panels']) == 1 else 'multi_panel', 'caption':caption}, 'items':items})


def compile_layout(layout_json, layout, bleed=72):
    # Accept the legacy argument for old workflows; only actual slot geometry controls crossing.
    layout = validate_layout(layout)
    if not isinstance(layout_json, str) or not layout_json.strip():
        raise ValueError('请输入整页画面提示词，或含 summary/items 的 Layout JSON。')
    text = layout_json.strip()
    fences = re.findall(r'(?m)^[ \t]*```[^\r\n]*', text)
    if fences:
        block = re.search(r'^[ \t]*```(?:json)?[ \t]*\r?\n(.*?)^[ \t]*```[ \t]*(?:\r?\n|$)', text, re.M | re.S | re.I)
        if len(fences) != 2 or not block:
            raise ValueError('请提供一个完整的 JSON 代码块；多个代码块或未闭合的代码围栏需要先整理。')
        text = block.group(1).strip()
    if not fences and not text.startswith(('{', '[')):
        anchors = frame_corner_items(layout)
        if anchors:
            return dumps({'summary':{'canvas':'multi_panel', 'caption':page_guide(layout)+' '+layout_json},
                          'items':anchors, 'bbox_coord_space':'abs_centralized', 'bbox_format':'yxyx'})
        return page_guide(layout)+'\n\n'+layout_json
    try:
        root = json.loads(text, parse_constant=reject_constant)
    except (ValueError, TypeError) as error:
        raise ValueError('输入已识别为 Layout JSON，但格式无法解析；请检查引号、换行、括号和 JSON 对象结构。') from error
    if not isinstance(root, dict) or not isinstance(root.get('summary'), dict) or not isinstance(root['summary'].get('caption'), str) or not root['summary']['caption'].strip():
        raise ValueError('输入需要 summary.caption 和 items；可点击“一键复制说明”交给 LLM 生成。')
    if not isinstance(root.get('items'), list) or not root['items']:
        raise ValueError('items 需要非空数组。')
    panels, groups = layout['panels'], {}
    for item in root['items']:
        if not isinstance(item, dict):
            raise ValueError('每个 item 需要对象。')
        index = panel_index(layout, item.get('panel'))
        panel = panels[index]
        slot = str(item.get('slot', '')).strip().upper()
        if not slot:
            raise ValueError(f'第 {index+1} 格内容缺少 slot；不能仅用 bbox 绕过版式。')
        if item.get('label') not in ('object', 'character', 'text') or not isinstance(item.get('caption'), str) or not item['caption'].strip():
            raise ValueError('每项需要有效的 label（object/character/text）和非空 caption。')
        if item['label'] == 'text' and (not isinstance(item.get('text'), str) or not item['text'].strip()):
            raise ValueError('文字项需要非空 text，不创建空气泡。')
        box = panel['slots'].get(slot)
        if box is None:
            raise ValueError(f'第 {index+1} 格没有 {slot} 槽位，可用：{" ".join(panel["slots"])}。')
        item['bbox'] = list(box)
        caption = re.sub(r'^\s*panel\s+\d+\s*[,;:]\s*', '', item['caption'], flags=re.I)
        item['caption'] = caption if len(panels)==1 and index in omitted_frames(layout) else f'Content of panel {index+1}: {caption}'.strip()
        if item['label'] == 'text':
            if slot_type(slot) in TEXT_REGIONS:
                item['caption'] += f' Placement: {TEXT_REGIONS[slot_type(slot)]} text region.'
            group = groups.setdefault((index, slot), {'box':box, 'items':[], 'shaped':slot in panel.get('shapes', {})})
            group['items'].append(item)
        shape = panel.get('shapes', {}).get(slot)
        if shape and slot != 'F':
            corners = ', '.join(f'({x},{y})' for x, y in shape)
            item['caption'] += f' Composition guide: this region has a slanted quadrilateral contour with clockwise corners {corners}, in centered pixel coordinates. Preserve the illustrated contents without warping them; this is a composition guide, not lettering.'
        del item['panel']
        del item['slot']
    for group in groups.values():
        count = len(group['items'])
        if count < 2:
            continue
        if group['shaped']:
            raise ValueError('同一非矩形字区有多条文字，请分别选区或拆格。')
        top, left, bottom, right = group['box']
        gap = min(8, (bottom-top)//(count*4))
        height = (bottom-top-gap*(count-1))/count
        if height < 1:
            raise ValueError('字区容量不足，请选择独立字区或拆格。')
        for index, item in enumerate(group['items']):
            item['bbox'] = [math.floor(top+index*(height+gap)+.5), left, math.floor(top+index*(height+gap)+height+.5), right]
            item['caption'] += f' Text {index+1} of {count} in this region, read from top to bottom.'
    root.pop('layout', None)
    root['summary']['caption'] = page_guide(layout, any(item['label'] == 'text' for item in root['items']))+' '+root['summary']['caption']
    root['items'].extend(frame_corner_items(layout))
    root['bbox_coord_space'], root['bbox_format'] = 'abs_centralized', 'yxyx'
    return dumps(root)
