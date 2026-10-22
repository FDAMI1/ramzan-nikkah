"""Pull the artwork out of the printed invitation so the site matches the card.

    python scripts/prepare-assets.py

Reads the invitation PDF in the project root and writes into public/:
  img/watercolor.jpg   the blue-to-cream paper wash behind the card
  img/floral.webp      the watercolour corner spray (transparent)
  img/couple.webp      the bride & groom illustration (transparent)
  img/bismillah.png    the calligraphy alone, as an alpha mask (recoloured in CSS)
  img/card.jpg         the whole card, for the "Invitation" section
  invitation.pdf       the original, for download
"""
import io
import shutil
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = next(ROOT.glob("*BLESSINGS*.pdf"))
OUT = ROOT / "public"
IMG = OUT / "img"
IMG.mkdir(parents=True, exist_ok=True)

doc = fitz.open(SRC)
page = doc[0]


def pil(xref):
    pix = fitz.Pixmap(doc, xref)
    smask = doc.extract_image(xref).get("smask", 0)
    if smask:
        pix = fitz.Pixmap(pix, fitz.Pixmap(doc, smask))
    if pix.n - pix.alpha >= 4:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    return Image.open(io.BytesIO(pix.tobytes("png")))


xrefs = {}
for info in page.get_image_info(xrefs=True):
    im = doc.extract_image(info["xref"])
    xrefs.setdefault((im["width"], im["height"]), info["xref"])

by_size = sorted(xrefs.items(), key=lambda kv: kv[0][0] * kv[0][1])
for (w, h), x in by_size:
    img = pil(x)
    if img.mode != "RGBA":  # the only opaque image is the paper wash
        img.convert("RGB").save(IMG / "watercolor.jpg", quality=84, optimize=True, progressive=True)
    elif w > 1200:  # the couple
        img.thumbnail((1000, 1000), Image.LANCZOS)
        img.save(IMG / "couple.webp", quality=88, method=6)
    else:  # floral spray
        img.save(IMG / "floral.webp", quality=90, method=6)

# Whole card, for display.
card = Image.open(io.BytesIO(page.get_pixmap(dpi=200).tobytes("png"))).convert("RGB")
card.thumbnail((1100, 1600), Image.LANCZOS)
card.save(IMG / "card.jpg", quality=86, optimize=True, progressive=True)

# Calligraphy: the Bismillah is vector art at the top of the card (a navy fill
# over a light-blue offset shadow). Copy those paths straight into an SVG so it
# stays sharp at any size and can be recoloured with a CSS mask.
def path_d(items, ox, oy):
    out, last = [], None
    f = lambda pt: f"{pt.x - ox:.2f} {pt.y - oy:.2f}"
    for it in items:
        kind = it[0]
        if kind == "re":
            r = it[1]
            out.append(f"M{r.x0 - ox:.2f} {r.y0 - oy:.2f}h{r.width:.2f}v{r.height:.2f}h{-r.width:.2f}Z")
            last = None
            continue
        if kind == "qu":
            q = it[1]
            out.append(f"M{f(q.ul)}L{f(q.ur)}L{f(q.lr)}L{f(q.ll)}Z")
            last = None
            continue
        start = it[1]
        if last is None or abs(start.x - last.x) > 1e-3 or abs(start.y - last.y) > 1e-3:
            out.append(f"M{f(start)}")
        if kind == "l":
            out.append(f"L{f(it[2])}")
            last = it[2]
        elif kind == "c":
            out.append(f"C{f(it[2])} {f(it[3])} {f(it[4])}")
            last = it[4]
    return "".join(out)


top = [d for d in page.get_drawings() if d["rect"].y1 < 60 and d.get("fill") and d["fill"] != (0.0, 0.0, 0.0)]
box = fitz.Rect()
for d in top:
    box |= d["rect"]
hexc = lambda c: "#%02x%02x%02x" % tuple(round(v * 255) for v in c)
# Shadow first, ink on top.
layers = sorted(top, key=lambda d: -sum(d["fill"]))
paths = "".join(
    f'<path fill="{hexc(d["fill"])}" fill-rule="{"evenodd" if d.get("even_odd") else "nonzero"}" d="{path_d(d["items"], box.x0, box.y0)}"/>'
    for d in layers
)
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {box.width:.2f} {box.height:.2f}">{paths}</svg>'
(IMG / "bismillah.svg").write_text(svg, encoding="utf-8")
(IMG / "bismillah.png").unlink(missing_ok=True)

shutil.copyfile(SRC, OUT / "invitation.pdf")
for f in sorted(IMG.iterdir()):
    print(f"  {f.relative_to(ROOT)}  {f.stat().st_size // 1024} KB")
print("  public/invitation.pdf")
