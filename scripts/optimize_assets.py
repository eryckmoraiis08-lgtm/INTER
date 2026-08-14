from PIL import Image
import os

paths = [
    "/home/ubuntu/notificacao-premium/assets/images/icon.png",
    "/home/ubuntu/notificacao-premium/assets/images/splash-icon.png",
    "/home/ubuntu/notificacao-premium/assets/images/favicon.png",
    "/home/ubuntu/notificacao-premium/assets/images/android-icon-foreground.png"
]

for p in paths:
    if os.path.exists(p):
        img = Image.open(p)
        img = img.resize((512, 512), Image.Resampling.LANCZOS)
        img.save(p, "PNG", optimize=True)
        print(f"Resized and optimized {p}: {os.path.getsize(p) / 1024:.1f} KB")
