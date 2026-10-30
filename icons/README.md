# Icons

PNG icons (`icon16.png`, `icon48.png`, `icon128.png`) are generated locally for the release ZIP.

For the repository, use the lock SVG or generate PNGs with:

```bash
# requires Pillow
python3 -c "
from PIL import Image, ImageDraw
for s in [16,48,128]:
    img = Image.new('RGBA', (s,s), (0,0,0,0))
    d = ImageDraw.Draw(img)
    m = max(1,s//16); r = s//5
    d.rounded_rectangle([m,m,s-m-1,s-m-1], radius=r, fill=(15,23,42,255))
    cx,cy = s//2, s//2 + s//12
    bw,bh = s/2.2, s/2.5
    x0,y0 = cx-bw/2, cy-bh/4
    d.rounded_rectangle([x0,y0,x0+bw,y0+bh], radius=s//12, fill=(56,189,248,255))
    img.save(f'icon{s}.png')
"
```

Or pack the extension in Chrome (`chrome://extensions` → Pack extension) which does not require fancy icons to work.
