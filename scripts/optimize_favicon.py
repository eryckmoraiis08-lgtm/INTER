from PIL import Image
import os

p = "/home/ubuntu/notificacao-premium/assets/images/favicon.png"
if os.path.exists(p):
    img = Image.open(p)
    img = img.resize((128, 128), Image.Resampling.LANCZOS)
    img.save(p, "PNG", optimize=True)
    print(f"Optimized favicon: {os.path.getsize(p) / 1024:.1f} KB")
