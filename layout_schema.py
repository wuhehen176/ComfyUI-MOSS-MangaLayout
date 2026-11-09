"""Layout file validation and JSON primitives; no prompt compilation."""
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
    return (isinstance(value, (int, float)) and not isinstance(value, bool)
            and abs(value) <= 9007199254740991 and math.isfinite(value) and value == int(value))


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
    # Old Skill exports remain valid; retain the unused orientation on disk.
    if 'panels' not in layout:
        canvas=layout.get('canvas', {'width':1088,'height':1920} if layout.get('portrait') else {'width':1920,'height':1088})
        if not isinstance(canvas,dict) or not all(integer(canvas.get(k)) for k in ('width','height')): raise ValueError('画布格式错误。')
        direction='landscape' if canvas['width']>canvas['height'] else 'portrait'
        layout['canvas']=canvas
        layout['panels']=layout.get(direction)
    for key in ('omitFullPageFrame','omitSmallFrames'):
        if key in layout and not isinstance(layout[key],bool):
            raise ValueError(f'{key} 需要布尔值。')
    canvas=layout.get('canvas',{})
    if isinstance(canvas,dict) and all(integer(canvas.get(k)) for k in ('width','height')):
        primary='landscape' if canvas['width']>canvas['height'] else 'portrait'
        if primary in layout and layout[primary]!=layout.get('panels'):
            raise ValueError('panels 与对应方向内容冲突，请明确保留哪个版本。')
        other='portrait' if primary=='landscape' else 'landscape'
        if other in layout:
            validate_layout({'id':layout['id'],'canvas':{'width':canvas['height'],'height':canvas['width']},'panels':layout[other]})
    layout['id'] = layout['id'].strip()
    if 'useBboxCorners' in layout and not isinstance(layout['useBboxCorners'], bool):
        raise ValueError('使用 BBOX 角点需要布尔值 true 或 false。')
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
    layout['canvas'] = canvas = {**canvas, 'width':int(canvas['width']), 'height':int(canvas['height'])}
    panels = layout.get('panels')
    if not isinstance(panels, list) or not panels:
        raise ValueError('版式至少需要一格。')
    positions = set()
    for index, panel in enumerate(panels):
        if not isinstance(panel, dict) or not isinstance(panel.get('position'), str) or not panel['position'].strip():
            raise ValueError(f'第 {index+1} 格缺少 position。')
        position = panel['position'].strip()
        if position.lower() in positions:
            raise ValueError('格子的 position 不能重复。')
        positions.add(position.lower())
        panel['position'] = position
        if 'layer' in panel and not integer(panel['layer']):
            raise ValueError('遮挡层级需要整数。')
        if 'layer' in panel:
            panel['layer'] = int(panel['layer'])
        if 'locked' in panel and not isinstance(panel['locked'],bool): raise ValueError('锁定状态需要布尔值。')
        slots = panel.get('slots')
        if not isinstance(slots, dict) or not slots:
            raise ValueError(f'第 {index+1} 格缺少槽位。')
        for key, box in slots.items():
            if isinstance(key, str) and slot_type(key) == 'X':
                raise ValueError('X 槽位已移除，请将跨格主体放入 S 或编号主体框，并调整其实际坐标。')
            if not isinstance(key, str) or not re.fullmatch(r'[A-Z]+(?:_[1-9]\d*)?', key) or not isinstance(box, list) or len(box) != 4 or not all(integer(n) for n in box):
                raise ValueError(f'第 {index+1} 格槽位格式错误。')
            top, left, bottom, right = box
            if not (-canvas['height']/2 <= top < bottom <= canvas['height']/2 and -canvas['width']/2 <= left < right <= canvas['width']/2):
                raise ValueError(f'第 {index+1} 格的 {key} 越界或没有有效面积。')
            slots[key] = [int(n) for n in box]
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
