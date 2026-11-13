"""Non-generative tonal correction and 4K-sized exports; originals stay untouched."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance, ImageFilter
import hashlib
import json
import shutil

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'research/photo-polish-2026-11-11'
STAGE = WORK / 'stage'
BEFORE = WORK / 'before'
PROCESS = 'Non-generative: EXIF orientation, conservative tone-preserving contrast, adaptive shadow exposure, 2% saturation, edge-limited sharpening and Lanczos resampling. No reconstruction, scene edits, retouching, cropping or face alteration. Full views use at least a 3840px long edge; larger original resolution is retained.'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def percentile(hist, fraction):
    total, accum = sum(hist), 0
    for index, value in enumerate(hist):
        accum += value
        if accum >= total * fraction:
            return index
    return 255

def jobs():
    items = []
    for record in json.loads((ROOT / 'research/gallery-2026-11-11/inventory.json').read_text(encoding='utf-8-sig')):
        name = f"atb-{int(record['id']):02d}"
        items.append(dict(key=name, source=record['path'], expected=record['sha256'],
                          regular=f'images/gallery/{name}.webp', full=f'images/gallery/{name}-full.webp',
                          origin=f"Client gallery photograph: {record['originalName']}; source archive: {record['archive']}"))
    for path in sorted((ROOT / 'public/images/enhanced').iterdir()):
        if path.suffix.lower() not in ('.jpg', '.jpeg', '.png', '.webp'):
            continue
        source = BEFORE / 'images/enhanced' / path.name
        source.parent.mkdir(parents=True, exist_ok=True)
        if not source.exists():
            shutil.copy2(path, source)
        items.append(dict(key=f'enhanced/{path.name}', source=str(source.relative_to(ROOT)), expected=sha(source),
                          regular=f'images/enhanced/{path.name}', full=f'images/polished-4k/enhanced/{path.name}',
                          origin=f'Existing website asset: /images/enhanced/{path.name}; content retained exactly as supplied to this processing pass'))
    for name in ('sehaj-trophy.webp', 'eshita-trophy.webp', 'academy-event.webp'):
        source = ROOT / 'public/images' / name
        items.append(dict(key=f'archive/{name}', source=str(source.relative_to(ROOT)), expected=sha(source),
                          regular=f'images/polished/archive/{name}', full=f'images/polished-4k/archive/{name}',
                          origin=f'Existing historical academy photograph: /images/{name}'))
    return items

def resized(image, edge):
    ratio = edge / max(image.size)
    return image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)

def save(image, relative, provenance):
    path = STAGE / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix.lower() == '.webp':
        image.save(path, 'WEBP', quality=90, method=5)
    elif path.suffix.lower() in ('.jpg', '.jpeg'):
        image.convert('RGB').save(path, 'JPEG', quality=94, subsampling=0, optimize=True)
    else:
        image.save(path, 'PNG', optimize=True)
    path.with_name(path.name + '.json').write_text(json.dumps({'prompt': provenance, 'process': PROCESS}, indent=2), encoding='utf-8')
    with Image.open(path) as check:
        check.load()
        assert check.size == image.size, relative
    return {'url': '/' + relative, 'width': image.width, 'height': image.height, 'bytes': path.stat().st_size}

def process(item):
    source = ROOT / item['source']
    assert sha(source) == item['expected'], f"Source checksum mismatch: {source}"
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).copy()
    alpha = image.getchannel('A') if 'A' in image.getbands() else None
    color = image.convert('RGB')
    median = percentile(color.resize((192,192)).convert('L').histogram(), .5)
    gamma = .92 if median < 80 else .96 if median < 125 else .985 if median < 155 else 1.0
    balanced = ImageOps.autocontrast(color, cutoff=(.15, .08), preserve_tone=True)
    color = Image.blend(color, balanced, .30)
    curve = [round(255 * ((value / 255) ** gamma)) for value in range(256)]
    color = color.point(curve * 3)
    color = ImageEnhance.Color(color).enhance(1.02)
    color = color.filter(ImageFilter.UnsharpMask(radius=1.0, percent=55, threshold=4))
    if alpha is not None:
        color.putalpha(alpha)
    original_size = color.size
    full = resized(color, max(3840, max(color.size)))
    full = full.filter(ImageFilter.UnsharpMask(radius=.65, percent=35, threshold=4))
    regular = resized(color, min(1800, max(color.size)))
    if item['key'].startswith('atb-'):
        regular = resized(color, round(max(color.size) * min(1,1200 / color.width)))
    provenance = f"Source: {item['origin']}. Source SHA256: {item['expected']}. {PROCESS} Adaptive gamma={gamma}."
    result = dict(item, originalSize=original_size, gamma=gamma,
                  regularExport=save(regular, item['regular'], provenance),
                  fullExport=save(full, item['full'], provenance))
    assert sha(source) == item['expected'], 'Source modified'
    return result

def main():
    WORK.mkdir(parents=True, exist_ok=True)
    items = jobs()
    (WORK / 'input-inventory.json').write_text(json.dumps(items,indent=2),encoding='utf-8')
    results = []
    with ThreadPoolExecutor(max_workers=2) as pool:
        for result in pool.map(process, items):
            results.append(result)
            if len(results) % 6 == 0 or len(results) == len(items):
                print(f'Processed {len(results)}/{len(items)} assets; originals verified unchanged.', flush=True)
    (WORK / 'exports.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
    manifest = {r['regularExport']['url']: {
        'src':r['regularExport']['url'], 'width':r['regularExport']['width'], 'height':r['regularExport']['height'],
        'full':r['fullExport']['url'], 'fullWidth':r['fullExport']['width'], 'fullHeight':r['fullExport']['height']
    } for r in results}
    (ROOT / 'src/photo-quality-assets.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
    print(f'Staged {len(results)*2} verified exports. Publish after visual inspection.', flush=True)

if __name__ == '__main__':
    main()
