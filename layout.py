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
            if isinstance(key, str) and slot_type(key) == 'X':
                raise ValueError('X 槽位已移除，请将跨格主体放入 S 或编号主体框，并调整其实际坐标。')
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


def frames_overlap(first, second):
    """Positive-area intersection of convex frame outlines (separating axes)."""
    polygons = []
    for panel in (first, second):
        box = panel['slots'].get('F')
        if not box:
            return False
        top, left, bottom, right = box
        polygons.append(panel.get('shapes', {}).get('F') or [[left, top], [right, top], [right, bottom], [left, bottom]])
    for points in polygons:
        for index, (x, y) in enumerate(points):
            next_x, next_y = points[(index+1) % len(points)]
            axis_x, axis_y = y-next_y, next_x-x
            a, b = [[px*axis_x+py*axis_y for px, py in polygon] for polygon in polygons]
            if min(max(a), max(b)) <= max(min(a), min(b)):
                return False
    return True


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
            if frames_overlap(panels[back], panels[front]):
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
    slots = '\n'.join(f'{i+1}（position={panel["position"]}）: '+ ' '.join(panel['slots']) for i, panel in enumerate(layout['panels']))
    return f'''请结合用户最新要求、原文及下方版式描述，整理成可用于 MOSS 的单页 Layout 内容提示词。节点只负责编译坐标，画面内容由你组织。

【输出方式】
先用简短条目说明实际改动、采用的必要假设或需要回编辑器调整的几何问题，只报告结论；没有实质改动时说明已按原意整理，不为凑条数虚构问题。几何结论以实际获得的数据为限：只有槽位清单和文字描述时，可以检查内容矛盾，但应说明未核对完整几何；获得画布、各框坐标及已有 shapes 后，才检查越界、斜边、留白与重叠，不能仅凭描述断言没有几何冲突。
随后输出且只输出一个标记为 json 的可复制代码块，代码块内放完整单页 JSON 对象。说明放在代码块外，JSON 内保持标准语法。

【内容组织】
保留既定人物身份、人数、事件、画风和准确台词；用户最新修订优先。可补充绘制所需的机位、景别、神态、姿态、衣物覆盖、支撑、接触、光照与遮挡关系，整合重复描述、纠正内部矛盾；不要仅逐句翻译或机械填表，也不按固定字数凑长。
用户明确指定的超现实或打破第四面墙构图属于创作意图，例如坐在分格线上、悬浮或跨格。保留这些意图，在其内部澄清姿态和空间关系，不擅自改成普通坐姿或写实场景；仅将真实的内在矛盾作为待修正问题。
主要人物 caption 应足以交代身份、外观锚点、可见身体范围、姿态／动作和神态，环境项按实际需要简明描述。输入中已有的角色英文名和身份 tags 要绑定到对应人物，避免丢成泛指角色。
同人角色身份 tag 按本节点约定使用 Danbooru 可读写法：英文小写、词间空格、作品限定放在括号内，例如 shirasu azusa (blue archive)。仅对已确认的角色身份 tag 做等价的下划线转空格整理，保留作品、服装和版本限定；不确定正式 tag 时保留已知身份并在说明中交代，不猜造。其他风格 tag、LoRA 触发词和功能标记按原值保留。
同格同一人物的一次连续身体展示，以一个主要 character 项交代整体身份、外观、可见范围、姿态和神态。有独立定位任务的抓握、关节、衣袖、饰品、局部出框或接触辅助槽位，分别输出引用其完整 slot 的局部 item；在主体 caption 中提到该部位，不能替代局部 item 的坐标定位。节点只为实际输出的 item 回填坐标，省略局部 item 就不会使用该槽位的区域。
复杂姿势采用完整主体项加必要的局部辅助项。每个局部 caption 写清所属角色、具体部位及左右、连接部位、接触对象和前后遮挡，衣物覆盖与主体一致；只细化已有部位，不重述完整人物或增加肢体。一次身体展示可以由一个主体 item 与多个局部 item 共同说明，item 数量不等于人物数量。仅重复文字且没有独立定位任务的区域才可合并或省略。
同一角色的独立放大肖像与较小站姿等有意的多尺度并置，保留各自 item 和同一身份；身体连续性只约束各次展示内部，不把两处画面拼接成一具身体。未知姓名使用 Character 1、Character 2 等稳定称呼，跨格沿用，角色编号与槽位编号分别管理。
F 描述整格，可以包含人物及其与环境的构图关系，不限于纯背景。同格已有 S 承载主要人物时，推荐把详细身份、动作和神态集中到 S，F 侧重整格视角、场景与关系，减少完整人物描述的重复；这是组织建议，不把 F 提及人物本身判为错误。
槽位是可选的内容区域，不是必须逐项填满的配额。仅为有实际画面内容或准确文字的区域创建 item；未使用区域省略，勿输出“沿用默认含义”“辅助留白”“无新增元素”等占位 item。明确承担实际局部辅助定位的槽位属于有效内容，按上述规则保留其局部 item，而非按冗余文字省略。背景 C 只有在没有独立环境定位作用时才可合入 F。
label 根据实际内容选择：人物及人物身体局部可为 character，背景／道具／装饰为 object，准确可见文字为 text。一个 character 局部项不自动代表另一位人物，其身份与连接由 caption 写清；不靠统一改成 object 来处理人物数量。槽位名称只是区域标识；S 可承载装饰，BR 也可承载实际放在该处的道具，不能仅凭名称机械分类。
逐格检查人物的头发、头部、手脚、衣袖及饰品的出框关系，包含下格主体向上越过本格边界的情况。主体使用实际存在的 S、L、R 或编号主体框交代整体连续性与前后关系；已有局部出框辅助槽位时，保留相应局部 item，写清越过哪条边、进入格间留白还是相邻格、覆盖哪些背景及避让位置。参考图实际裁切处保持裁切，不自动补全画外身体。若人物、桌椅或支撑位置互相矛盾，采用与用户最新要求一致的可绘制关系，并在代码块外说明；需要移动或增删框时明确告知，保留当前合法几何引用，不能靠文字宣称已修正坐标。
情绪参考写成可见五官和动作；准确台词仅放 text，不在 caption 再抄一遍字样。一句台词只分配一次，字区按说话人和阅读路径选用，静默格保留画面空间。
对白 text 项在 caption 中用英文明确说话人，例如 Spoken by Shirasu Azusa，并与人物 caption 的英文名保持一致；同人角色使用已确认的英文角色名，未知姓名使用稳定的英文角色称呼，不补造身份。画外对白同时说明发声源位置。旁白标明 narration，拟声标明 sound effect 及声源，不强加人物说话人。

【JSON 契约】
根字段使用 summary 和 items。summary.caption 是非空英文字符串，概括整页风格、共用环境／光照、准确格数和整数格号读序，避免重复逐项列举局部内容。输入中已有的 summary.meta、summary.canvas、summary.palette 按原值保留。
summary.canvas 是可选字段，从零生成时可省略；填写时单格使用 single、多格使用 multi_panel。仅在输入已有该字段时要求保留，缺少它本身不算格式错误；它也不是版式库 canvas 中的宽高对象。
items 是非空数组；每项含 panel、slot、label、caption。panel 是从 1 起的整数，slot 完整引用下列对应格清单，label 为 object、character 或 text，caption 使用非空英文字符串；用户另有描述语言要求时遵从用户。准确对白及已有可见字样保留原语言。
text 项另有非空 text 字符串，其他项省略 text。已有 tags 按上述身份 tag 规则整理，其余 tag 与 palette 保留原值；tags、summary.meta 若存在，使用字符串数组。
同类内框可有编号，例如 S、S_2 或 TL、TL_2；每个完整键对应独立区域。编号不表示读序或新增人物。只引用已列出的键。
当前版式共有 {len(layout['panels'])} 格，panel 按下方清单从 1 起顺序阅读。position 是稳定别名，其中的数字不是格号；summary 与 items 都使用实际整数格号。
bbox、bbox_format、bbox_coord_space、width、height、layer、z-index 由节点处理，输出内容中省略这些字段。输入中的 layout 不负责选择版式，以节点选择为准。字符串换行使用合法 JSON 转义。

【当前版式：格号与合法槽位】
{slots}'''
