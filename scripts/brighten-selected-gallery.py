"""Targeted exposure correction; no AI, retouching, cropping or scene edits."""
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance, ImageFilter, ImageDraw, ImageStat
import json,hashlib,shutil

root=Path(__file__).resolve().parents[1]
work=root/'research/exposure-spacing-2026-11-11'
work.mkdir(parents=True,exist_ok=True)
inventory=json.loads((root/'research/gallery-2026-11-11/inventory.json').read_text(encoding='utf-8-sig'))
records=[]
contact=Image.new('RGB',(1000,740),'#f4f5eb')
draw=ImageDraw.Draw(contact)
for row,(number,gamma,saturation) in enumerate([(4,.55,1.18),(10,.68,1.20)]):
    source=next(item for item in inventory if item['id']==number)
    original=root/source['path']
    assert hashlib.sha256(original.read_bytes()).hexdigest()==source['sha256']
    with Image.open(original) as raw:
        image=ImageOps.exif_transpose(raw).convert('RGB')
    before_file=work/'before'/f'atb-{number:02d}.webp'
    if not before_file.exists(): before_file=root/f'public/images/gallery/atb-{number:02d}.webp'
    with Image.open(before_file) as raw:
        before=raw.convert('RGB')
    luminance,cb,cr=image.convert('YCbCr').split()
    curve=[round(255*((value/255)**gamma)) for value in range(256)]
    corrected=Image.merge('YCbCr',(luminance.point(curve),cb,cr)).convert('RGB')
    corrected=ImageEnhance.Color(corrected).enhance(saturation)
    corrected=ImageEnhance.Contrast(corrected).enhance(1.025)
    corrected=corrected.filter(ImageFilter.UnsharpMask(radius=1.1,percent=45,threshold=4))
    exports=[]
    for suffix,width in [('',1200),('-full',max(3840,max(image.size))*image.width/max(image.size))]:
        target=root/f'public/images/gallery/atb-{number:02d}{suffix}.webp'
        backup=work/'before'/target.name
        backup.parent.mkdir(parents=True,exist_ok=True)
        if not backup.exists(): shutil.copy2(target,backup)
        ratio=width/image.width
        output=corrected.resize((round(image.width*ratio),round(image.height*ratio)),Image.Resampling.LANCZOS)
        output.save(target,'WEBP',quality=92,method=6)
        with Image.open(target) as check:
            check.load()
            assert check.size==output.size
        exports.append({'path':str(target.relative_to(root)),'size':output.size})
    origin=f"Source: client gallery photograph {source['originalName']}, original SHA256 {source['sha256']}. Targeted non-generative luminance exposure curve gamma={gamma}, saturation={saturation}, contrast=1.025, restrained edge sharpening, Lanczos resize. No regeneration, retouching, crop or scene change."
    after_small=ImageOps.contain(corrected,(450,315))
    before_small=ImageOps.contain(before,(450,315))
    for col,(label,thumb) in enumerate([('BEFORE',before_small),('EXPOSURE + VIBRANCE',after_small)]):
        x=col*500;y=row*370
        draw.text((x+24,y+12),f'ATB {number:02d} | {label}',fill='#15392e')
        contact.paste(thumb,(x+(500-thumb.width)//2,y+40+(315-thumb.height)//2))
    region=(0,image.height//2,image.width,image.height)
    records.append({'id':number,'source':source,'gamma':gamma,'saturation':saturation,'origin':origin,'exports':exports,
      'foregroundLuminanceBefore':ImageStat.Stat(image.crop(region).convert('L')).mean[0],
      'foregroundLuminanceAfter':ImageStat.Stat(corrected.crop(region).convert('L')).mean[0]})
    assert hashlib.sha256(original.read_bytes()).hexdigest()==source['sha256']
(work/'exports.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
contact.save(work/'before-after.jpg',quality=94)
print(json.dumps([{'id':r['id'],'before':round(r['foregroundLuminanceBefore'],1),'after':round(r['foregroundLuminanceAfter'],1)} for r in records]))
