import sys
from pypdf import PdfReader

src = r"G:\Dineth\iGaming-CTO\Jurisdictional licensing\licensing-visualizer\GAMBLING REGULATORY AUTHORITY ACT No 17 of 2025.pdf"
out = r"G:\Dineth\iGaming-CTO\Jurisdictional licensing\licensing-visualizer\scripts\sri_lanka_act.txt"

reader = PdfReader(src)
parts = []
for i, page in enumerate(reader.pages, start=1):
    parts.append(f"\n===== PAGE {i} =====\n")
    parts.append(page.extract_text() or "")
text = "\n".join(parts)

with open(out, "w", encoding="utf-8") as f:
    f.write(text)

print(f"Pages: {len(reader.pages)}")
print(f"Wrote: {out}")
print(f"Char count: {len(text)}")
