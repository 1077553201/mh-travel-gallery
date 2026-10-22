# -*- coding: utf-8 -*-
"""换图预检工具：离线复刻 BootAnimationOverlay.jsx 的鎏金线稿提取算法，
   在浏览器外先看你的新图能不能提出好看的线稿，避免改完代码才发现糊成一团。

用法：
    python edge_preview.py <图片路径> [输出路径]

输出：左侧原图 / 右侧提取结果（叠在虚空墨黛底上），并打印"有效线稿密度"。
密度参考：0.30 ~ 0.55 通常正常；> 0.85 说明满屏噪点，线稿会糊成一片。
"""
import sys
import numpy as np
from PIL import Image, ImageDraw

# 与 src/data/bootConfig.js 保持一致
EDGE_MAX_DIM = 1568
EDGE_THRESHOLD = 26
INK_LUM = 72
MARBLE_LUM = 196

GOLD = np.array([255, 215, 130])
WARM = np.array([255, 215, 0])
JADE = np.array([226, 232, 240])
INK2 = np.array([10, 14, 23])


def extract(path, thr=EDGE_THRESHOLD, ink_lum=INK_LUM):
    img = Image.open(path).convert("RGB")
    iw, ih = img.size
    cap = min(1.0, EDGE_MAX_DIM / max(iw, ih))
    w, h = max(1, int(iw * cap)), max(1, int(ih * cap))
    small = img.resize((w, h), Image.LANCZOS)
    src = np.asarray(small).astype(np.float32)

    lum = 0.299 * src[:, :, 0] + 0.587 * src[:, :, 1] + 0.114 * src[:, :, 2]
    gx = np.abs(np.pad(lum, ((0, 0), (0, 1)), mode="edge")[:, 1:] - lum)
    gy = np.abs(np.pad(lum, ((0, 1), (0, 0)), mode="edge")[1:, :] - lum)
    g = np.zeros_like(lum)
    g[: h - 1, : w - 1] = gx[: h - 1, : w - 1] + gy[: h - 1, : w - 1]

    ink = lum < ink_lum
    keep = (g > thr) | ink
    alpha = np.clip((g - thr) / 170 + np.where(ink, 0.5, 0.28), 0, 1)

    out = np.zeros((h, w, 3), dtype=np.float32)
    yy = np.arange(h)[:, None].repeat(w, axis=1)
    marble = lum > MARBLE_LUM
    warm = (yy < h * 0.42) & (src[:, :, 0] > src[:, :, 2])
    out[marble] = JADE
    out[warm & ~marble] = WARM
    out[~marble & ~warm] = GOLD

    bg = np.zeros_like(out)
    bg[:] = INK2
    a = (alpha * keep)[:, :, None]
    comp = (out * a + bg * (1 - a)).astype(np.uint8)
    return small, Image.fromarray(comp), float(keep.mean()), float(alpha[keep].mean() if keep.any() else 0), (iw, ih)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    path = sys.argv[1]
    out_path = sys.argv[2] if len(sys.argv) > 2 else "edge-preview.png"

    orig, art, density, mean_alpha, size = extract(path)
    W = 620
    hh = max(1, int(orig.height * W / orig.width))
    o = orig.resize((W, hh), Image.LANCZOS)
    a = art.resize((W, hh), Image.LANCZOS)

    def titled(img, text):
        c = Image.new("RGB", (img.width, img.height + 26), (18, 22, 32))
        c.paste(img, (0, 26))
        ImageDraw.Draw(c).text((8, 8), text, fill=(210, 215, 225))
        return c

    sheet = Image.new("RGB", (W * 2 + 12, hh + 26 + 34), (10, 13, 20))
    d = ImageDraw.Draw(sheet)
    d.text((12, 12), "鎏金线稿提取预检  |  left 原图  /  right 提取结果", fill=(240, 220, 170))
    sheet.paste(titled(o, f"原图 {size[0]}x{size[1]}"), (0, 34))
    sheet.paste(titled(a, f"提取结果  密度 {density:.1%}  均值不透明度 {mean_alpha:.2f}"), (W + 12, 34))
    sheet.save(out_path)

    print(f"图片     : {path}  {size[0]}x{size[1]}  (比例 {size[0]/size[1]:.2f})")
    print(f"线稿密度 : {density:.1%}   {'⚠ 偏高，可能糊成一片' if density > 0.85 else '✓ 正常范围'}")
    print(f"均值不透明度: {mean_alpha:.2f}  {'⚠ 噪点偏多' if mean_alpha < 0.35 else '✓'}")
    print(f"未命中建筑区判定（u>=0.18 且 v>=0.08）: JS 侧还会再筛一遍，此处仅作参考")
    print(f"输出     : {out_path}")


if __name__ == "__main__":
    main()
