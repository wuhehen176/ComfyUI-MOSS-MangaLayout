"""Frame geometry and native-bbox guide assembly."""
import math
import re

if __package__:
    from .layout_schema import dumps, integer, slot_type
else:
    from layout_schema import dumps, integer, slot_type


def panel_index(layout, ref):
    if integer(ref):
        index = int(ref)-1
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


def slanted_quad(points):
    return bool(points) and any(x != points[(i+1)%4][0] and y != points[(i+1)%4][1]
                                for i, (x, y) in enumerate(points))


def frame_corner_items(layout):
    """Experimental native-bbox anchors for the four turns of a slanted frame."""
    if not layout.get('useBboxCorners', False):
        return []
    items = []
    width, height = layout['canvas']['width'], layout['canvas']['height']
    for index, panel in enumerate(layout['panels']):
        points = panel.get('shapes', {}).get('F')
        if index in omitted_frames(layout) or not slanted_quad(points):
            continue
        for corner, (x, y) in enumerate(points):
            # 16-pixel anchors are clipped at canvas edges, not moved inwards.
            box = [max(-height//2, math.floor(y-8)), max(-width//2, math.floor(x-8)),
                   min(height//2, math.ceil(y+8)), min(width//2, math.ceil(x+8))]
            items.append({'label':'object', 'caption':
                f'Panel {index+1} outer border, corner {corner+1} of 4 in clockwise order. '
                f'A tiny section of the same continuous frame outline, joining the straight edges toward corners {(corner-1)%4+1} and {(corner+1)%4+1}. '
                'This bbox locates the border junction; connect the four junctions into the single existing frame.', 'bbox':box})
    return items


def omitted_frames(layout):
    w,h=layout['canvas']['width']/2,layout['canvas']['height']/2
    result=set()
    for i,panel in enumerate(layout['panels']):
        box=panel['slots'].get('F')
        if not box: continue
        points=panel.get('shapes',{}).get('F',[[box[1],box[0]],[box[3],box[0]],[box[3],box[2]],[box[1],box[2]]])
        full=all(any(abs(x-a)<=1 and abs(y-b)<=1 for x,y in points) for a,b in [(-w,-h),(w,-h),(w,h),(-w,h)])
        if layout.get('omitFullPageFrame' if full else 'omitSmallFrames',False): result.add(i)
    return result


def page_guide(layout, has_text=False):
    panels, frames, relations = layout['panels'], [], []
    omitted=omitted_frames(layout)
    for i, panel in enumerate(panels):
        if i in omitted: continue
        box = panel['slots'].get('F', panel['slots'].get('C'))
        line = f'panel {i+1}' + (f' ({frame_position(box, layout["canvas"])}), outer frame yxyx [{", ".join(map(str, box))}]' if box else ' (no outer frame specified)')
        if layout.get('useBboxCorners', False) and slanted_quad(panel.get('shapes', {}).get('F')):
            line += '; outer contour follows its four clockwise corner-bbox items'
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
    lines = ([('Frame guide for the listed regions:' if omitted else f'Page frame guide: exactly {len(panels)} distinct comic panels; preserve the specified frames without additional subdivisions.'), 'All frame coordinates below are centered pixels.', '; '.join(frames)+'.'] if frames else [])
    if relations:
        lines.append('Stacking: '+'; '.join(relations)+'. Front frames occlude rear frames only in their overlap; the rear scene continues behind them. Overlays and inset panels do not split the rear frame into extra panels.')
    if frame_corner_items(layout):
        lines.append('The four corner-bbox items of each slanted outer frame locate its border junctions in clockwise order. Join these locations with straight frame edges. They belong to the existing frame count; corner labels are layout instructions rather than visible lettering.')
    if not omitted or len(panels)>1: lines.append(
        'Reading sequence: '+' then '.join(f'panel {i+1}' for i in range(len(panels)))+'; stacking does not change this sequence.')
    if not omitted: lines.append(
        'Each item belongs to its named panel; its bbox is a content region, not another comic frame. Only explicitly described border overlaps may extend outside that panel. Panel references and layout instructions are not visible lettering.')
    if has_text:
        lines.append('Visible lettering follows the supplied text items and their assigned regions. Preserve each item\'s exact wording and described container. Text placement can overlap secondary clothing while keeping faces, key hand gestures, contact points and important props clearly visible.')
    return ' '.join(lines)
