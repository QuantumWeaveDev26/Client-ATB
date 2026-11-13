from pathlib import Path
from PIL import Image
import json, hashlib

root=Path(__file__).resolve().parents[1]
folder=root/'research/clay-program-update-2026-11-11'
records=json.loads((folder/'prompts.json').read_text(encoding='utf-8'))
manifest_path=root/'src/photo-quality-assets.json'
manifest=json.loads(manifest_path.read_text(encoding='utf-8'))
exports=[]
for record in records:
    with Image.open(root/record['source']) as image:
        image=image.convert('RGB')
        full_edge=max(3840,max(image.size))
        scale=full_edge/max(image.size)
        full=image.resize((round(image.width*scale),round(image.height*scale)),Image.Resampling.LANCZOS)
        preview=image.copy()
        preview.thumbnail((1800,1800),Image.Resampling.LANCZOS)
        paths={}
        for variant,data,prefix in [('regular',preview,'images/enhanced'),('full',full,'images/polished-4k/enhanced')]:
            relative=f"{prefix}/{record['name']}"
            target=root/'public'/relative
            target.parent.mkdir(parents=True,exist_ok=True)
            data.save(target,'WEBP',quality=92,method=6)
            with Image.open(target) as checked:
                checked.load()
                assert checked.size==data.size
            paths[variant]={'url':'/'+relative,'width':data.width,'height':data.height,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()}
        manifest.pop('/images/enhanced/'+record['old'],None)
        manifest[paths['regular']['url']]={
            'src':paths['regular']['url'],'width':preview.width,'height':preview.height,
            'full':paths['full']['url'],'fullWidth':full.width,'fullHeight':full.height}
        exports.append({**record,'exports':paths,'sourceSize':list(image.size),'resampling':'Lanczos to 3840px long edge; no native-detail claim'})
manifest_path.write_text(json.dumps(manifest,indent=2),encoding='utf-8')
(folder/'exports.json').write_text(json.dumps(exports,indent=2),encoding='utf-8')
print(f'Exported {len(exports)} client-requested clay edits in preview/full sizes; original hard-court assets retained.')
