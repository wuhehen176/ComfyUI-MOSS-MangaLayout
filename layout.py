import copy
import json
import math
import re


TEXT_REGIONS = {'T':'upper', 'TL':'upper-left', 'TR':'upper-right', 'B':'lower', 'BL':'lower-left', 'BR':'lower-right', 'ML':'middle-left', 'MR':'middle-right'}


def slot_type(key):
    return re.sub(r'_[1-9]\d*$', '', key)


def dumps(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':'), allow_nan=False)


def integer(value):
    return isinstance(value, int) and not isinstance(value, bool)


def reject_constant(value):
    raise ValueError(f'非法 JSON 数值：{value}')


def valid_quad(points):
    if not isinstance(points, list) or len(points) != 4:
        return False
    if any(not isinstance(p, list) or len(p) != 2 or any(not isinstance(n, (int, float)) or isinstance(n, bool) or not math.isfinite(n) for n in p) for p in points):
        return False
    return all((points[(i+1)%4][0]-p[0])*(points[(i+2)%4][1]-points[(i+1)%4][1])-(points[(i+1)%4][1]-p[1])*(points[(i+2)%4][0]-points[(i+1)%4][0]) > .01 for i, p in enumerate(points))


def validate_layout(raw):
    if not isinstance(raw, dict) or not isinstance(raw.get('id'), str) or not raw['id'].strip():
        raise ValueError('版式需要非空 id。')
    layout = copy.deepcopy(raw)
    layout['id'] = layout['id'].strip()
    if layout.get('promptMode', 'llm') not in ('llm', 'manual'):
        raise ValueError('提示词模式需要 llm 或 manual。')
    if 'promptCaption' in layout and not isinstance(layout['promptCaption'], str):
        raise ValueError('整页画面描述需要字符串。')
    if 'description' in layout and not isinstance(layout['description'], str):
        raise ValueError('画面描述需要字符串。')
    if 'description' not in layout:
        layout['description'] = '\n\n'.join(dict.fromkeys(value.strip() for value in (layout.get('usage'), layout.get('promptCaption')) if isinstance(value, str) and value.strip()))
    canvas = layout.get('canvas', {})
    if not isinstance(canvas, dict) or any(not integer(canvas.get(k)) or not 64 <= canvas[k] <= 8192 or canvas[k] % 2 for k in ('width', 'height')):
        raise ValueError('画布宽高需要是 64～8192 的偶数。')
    panels = layout.get('panels')
    if not isinstance(panels, list) or not panels:
        raise ValueError('版式至少需要一格。')
    positions = set()
    for index, panel in enumerate(panels):
        if not isinstance(panel, dict) or not isinstance(panel.get('position'), str) or not panel['position'].strip():
            raise ValueError(f'第 {index+1} 格缺少 position。')
        if panel['position'] in positions:
            raise ValueError('格子的 position 不能重复。')
        positions.add(panel['position'])
        if 'layer' in panel and not integer(panel['layer']):
            raise ValueError('遮挡层级需要整数。')
        slots = panel.get('slots')
        if not isinstance(slots, dict) or not slots:
            raise ValueError(f'第 {index+1} 格缺少槽位。')
        for key, box in slots.items():
            if not isinstance(key, str) or not re.fullmatch(r'[A-Z]+(?:_[1-9]\d*)?', key) or not isinstance(box, list) or len(box) != 4 or not all(integer(n) for n in box):
                raise ValueError(f'第 {index+1} 格槽位格式错误。')
            top, left, bottom, right = box
            if not (-canvas['height']/2 <= top < bottom <= canvas['height']/2 and -canvas['width']/2 <= left < right <= canvas['width']/2):
                raise ValueError(f'第 {index+1} 格的 {key} 越界或没有有效面积。')
        shapes = panel.get('shapes', {})
        if not isinstance(shapes, dict):
            raise ValueError('shapes 需要对象。')
        for key, points in shapes.items():
            if key not in slots or not valid_quad(points) or any(abs(x) > canvas['width']/2 or abs(y) > canvas['height']/2 for x, y in points):
                raise ValueError(f'第 {index+1} 格的 {key} 四边形无效或越界。')
        notes = panel.get('slotNotes', {})
        notes = {key.strip().upper(): value.strip() for key, value in notes.items()
                 if isinstance(key, str) and key.strip().upper() in slots and isinstance(value, str) and value.strip()} if isinstance(notes, dict) else {}
        if notes:
            panel['slotNotes'] = notes
        else:
            panel.pop('slotNotes', None)
        contents = panel.get('slotContents', {})
        if not isinstance(contents, dict):
            raise ValueError(f'第 {index+1} 格的手填内容需要对象。')
        normalized_contents = {}
        for key, entries in contents.items():
            slot = key.strip().upper() if isinstance(key, str) else ''
            if slot not in slots or slot in normalized_contents or not isinstance(entries, list):
                raise ValueError(f'第 {index+1} 格手填内容的槽位无效：{key}。')
            for entry in entries:
                if not isinstance(entry, dict) or entry.get('label') not in ('object', 'character', 'text') or not isinstance(entry.get('caption'), str):
                    raise ValueError(f'第 {index+1} 格的 {slot} 内容需要类型和字符串画面描述。')
                if 'text' in entry and not isinstance(entry['text'], str):
                    raise ValueError('准确台词需要字符串。')
                if entry.get('textType', 'dialogue') not in ('dialogue', 'narration', 'sfx'):
                    raise ValueError('文字类型需要 dialogue、narration 或 sfx。')
            normalized_contents[slot] = entries
        if normalized_contents:
            panel['slotContents'] = normalized_contents
        else:
            panel.pop('slotContents', None)
    return layout


def manual_source(layout):
    """Use shared descriptions in both modes; preserve explicit characters and text."""
    layout = validate_layout(layout)
    items = []
    for index, panel in enumerate(layout['panels']):
        panel_items = []
        for slot, note in panel.get('slotNotes', {}).items():
            entries = panel.get('slotContents', {}).get(slot, [])
            if note and not any(entry['label'] != 'text' and entry['caption'].strip() == note for entry in entries):
                label = 'character' if slot_type(slot) in ('S', 'L', 'R', 'X') else 'object'
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


def panel_index(layout, ref):
    if integer(ref):
        index = ref-1
    elif isinstance(ref, str) and ref.strip().isdigit():
        index = int(ref.strip())-1
    elif isinstance(ref, str):
        exact = next((i for i, p in enumerate(layout['panels']) if p['position'].lower() == ref.strip().lower()), None)
        if exact is not None:
            return exact
        match = re.fullmatch(r'panel-(\d+)', ref.strip(), re.I)
        index = int(match[1])-1 if match else -1
    else:
        index = -1
    if not 0 <= index < len(layout['panels']):
        raise ValueError(f'版式 {layout["id"]} 没有第 {ref} 格，共 {len(layout["panels"])} 格。')
    return index


def frame_position(box, canvas):
    top, left, bottom, right = box
    full_width, full_height = right-left >= canvas['width']*.85, bottom-top >= canvas['height']*.85
    if full_width and full_height:
        return 'nearly full-page'
    x, y = (left+right)/2, (top+bottom)/2
    horizontal = 'left' if x < -canvas['width']/6 else 'right' if x > canvas['width']/6 else 'center'
    vertical = 'upper' if y < -canvas['height']/6 else 'lower' if y > canvas['height']/6 else 'middle'
    return f'full-height {horizontal}' if full_height else f'full-width {vertical}' if full_width else f'{vertical}-{horizontal}'


def page_guide(layout, has_text=False):
    panels, frames, relations = layout['panels'], [], []
    for i, panel in enumerate(panels):
        box = panel['slots'].get('F', panel['slots'].get('C'))
        line = f'panel {i+1}' + (f' ({frame_position(box, layout["canvas"])}), outer frame yxyx [{", ".join(map(str, box))}]' if box else ' (no outer frame specified)')
        if 'F' in panel.get('shapes', {}):
            line += '; clockwise corners xy ' + dumps(panel['shapes']['F'])
        if box:
            for slot, region in panel['slots'].items():
                if slot_type(slot) not in ('S', 'L', 'R'):
                    continue
                if region and (region[0] < box[0] or region[1] < box[1] or region[2] > box[2] or region[3] > box[3]):
                    line += f'; {slot} is a continuous foreground subject region extending across the outer border, yxyx {dumps(region)}; keep its subject continuous across the crossed borders'
        frames.append(line)
    ordered = sorted(range(len(panels)), key=lambda i:(panels[i].get('layer', i), i))
    for rank, back in enumerate(ordered):
        for front in ordered[rank+1:]:
            a, b = panels[back]['slots'].get('F'), panels[front]['slots'].get('F')
            if a and b and a[0] < b[2] and b[0] < a[2] and a[1] < b[3] and b[1] < a[3]:
                relations.append(f'panel {front+1} is in front of panel {back+1}')
    lines = [f'Page frame guide: exactly {len(panels)} distinct comic panels; preserve the specified frames without additional subdivisions.', 'All frame coordinates below are centered pixels.', '; '.join(frames)+'.']
    if relations:
        lines.append('Stacking: '+'; '.join(relations)+'. Front frames occlude rear frames only in their overlap; the rear scene continues behind them. Overlays and inset panels do not split the rear frame into extra panels.')
    lines.extend([
        'Reading sequence: '+' then '.join(f'panel {i+1}' for i in range(len(panels)))+'; stacking does not change this sequence.',
        'Each item belongs to its named panel; its bbox is a content region, not another comic frame. Only explicitly described border overlaps may extend outside that panel. Panel references and layout instructions are not visible lettering.',
    ])
    if has_text:
        lines.append('Visible lettering follows the supplied text items and their assigned regions. Preserve each item\'s exact wording and described container. Text placement can overlap secondary clothing while keeping faces, key hand gestures, contact points and important props clearly visible.')
    return ' '.join(lines)


def compile_layout(layout_json, layout, bleed=72):
    layout = validate_layout(layout)
    if not isinstance(layout_json, str) or not layout_json.strip():
        raise ValueError('请输入整页画面提示词，或含 summary/items 的 Layout JSON。')
    text = layout_json.strip()
    if not text.startswith(('{', '[', '```')):
        return page_guide(layout)+'\n\n'+layout_json
    try:
        root = json.loads(text, parse_constant=reject_constant)
    except (ValueError, TypeError) as error:
        raise ValueError('输入已识别为 Layout JSON，但格式无法解析；请检查引号、换行和括号，并去掉代码围栏及外层包装。') from error
    if not isinstance(root, dict) or not isinstance(root.get('summary'), dict) or not isinstance(root['summary'].get('caption'), str) or not root['summary']['caption'].strip():
        raise ValueError('输入需要 summary.caption 和 items；请使用“复制格式转换说明”。')
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
        if slot == 'X' and 'X' not in panel['slots'] and 'F' in panel['slots']:
            margin = math.floor(bleed*(1.25 if len(panels)<=2 else 1 if len(panels)==3 else .8 if len(panels)==4 else .6)+.5)
            top, left, bottom, right = panel['slots']['F']
            box = [max(-layout['canvas']['height']//2, top-margin), max(-layout['canvas']['width']//2, left-margin), min(layout['canvas']['height']//2, bottom+margin), min(layout['canvas']['width']//2, right+margin)]
        else:
            box = panel['slots'].get(slot)
        if box is None:
            raise ValueError(f'第 {index+1} 格没有 {slot} 槽位，可用：{" ".join(panel["slots"])}。')
        item['bbox'] = list(box)
        caption = re.sub(r'^\s*panel\s+\d+\s*[,;:]\s*', '', item['caption'], flags=re.I)
        item['caption'] = f'Content of panel {index+1}: {caption}'.strip()
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
    root['bbox_coord_space'], root['bbox_format'] = 'abs_centralized', 'yxyx'
    return dumps(root)


def format_instructions(layout):
    layout = validate_layout(layout)
    slots = '\n'.join(f'{i+1}: '+ ' '.join(panel['slots']) + (' X' if 'F' in panel['slots'] and 'X' not in panel['slots'] else '') for i, panel in enumerate(layout['panels']))
    return f'''只转换输出格式，保留现有描述、风格和准确文字字样，不增加或改写画面内容。
每次直接输出一个单页 JSON 对象，不含 Markdown、代码围栏或说明文字。
根字段使用 summary 和 items；summary.caption 是非空字符串，已有的 meta、canvas、palette 按原值保留。
items 是非空数组；每项含 panel、slot、label、caption。panel 是从 1 起的整数；slot 必须来自下列对应格的清单。
同类内框可有编号，例如 S、S_2 或 TL、TL_2；每个键对应独立区域，按清单完整填写，不能省略编号或自行创建未列出的键。编号不表示读序或新增人物。
label 只能为 object、character 或 text；caption 是非空字符串。text 项另有非空 text 字符串，非文字项不加入 text。
已有 tags、palette 按原值保留；tags、summary.meta 若存在，使用字符串数组。
不输出 bbox、bbox_format、bbox_coord_space、width、height、layer 或 z-index，这些由节点处理。
输入中的 layout 不负责选择版式，以节点选择为准。字符串换行使用合法 JSON 转义。
当前版式共有 {len(layout['panels'])} 格，各格合法槽位：
{slots}'''
