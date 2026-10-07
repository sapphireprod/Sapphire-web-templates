"""Remove a baked checkerboard from the studio JPEGs and write PNG alpha."""

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets"


def flood(src: Path, dst: Path, sat_max: int, lum_min: int) -> None:
    rgb = np.asarray(Image.open(src).convert("RGB")).astype(np.int16)
    height, width, _ = rgb.shape
    red, green, blue = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    saturation = np.maximum(np.maximum(red, green), blue) - np.minimum(np.minimum(red, green), blue)
    luminance = (red + green + blue) / 3
    background = (saturation <= sat_max) & (luminance >= lum_min)
    visited = np.zeros((height, width), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    def consider(y: int, x: int) -> None:
        if y < 0 or x < 0 or y >= height or x >= width:
            return
        if visited[y, x] or not background[y, x]:
            return
        visited[y, x] = True
        queue.append((y, x))

    for x in range(width):
        consider(0, x)
        consider(height - 1, x)
    for y in range(height):
        consider(y, 0)
        consider(y, width - 1)
    while queue:
        y, x = queue.popleft()
        consider(y - 1, x)
        consider(y + 1, x)
        consider(y, x - 1)
        consider(y, x + 1)

    dilated = visited.copy()
    dilated[1:] |= visited[:-1]
    dilated[:-1] |= visited[1:]
    dilated[:, 1:] |= visited[:, :-1]
    dilated[:, :-1] |= visited[:, 1:]
    eaten = dilated & (saturation <= sat_max + 8) & (luminance >= lum_min - 12)
    alpha = np.where(eaten, 0, 255).astype(np.uint8)
    image = np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), alpha])
    Image.fromarray(image, "RGBA").save(dst, optimize=True)


def crop_margin(src: Path, dst: Path) -> None:
    rgb = np.asarray(Image.open(src).convert("RGB")).astype(np.int16)
    height, width, _ = rgb.shape
    red, green, blue = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    saturation = np.maximum(np.maximum(red, green), blue) - np.minimum(np.minimum(red, green), blue)
    luminance = (red + green + blue) / 3
    checker = (saturation <= 10) & (luminance >= 190)

    def row_is_background(y: int) -> bool:
        return bool(checker[y].mean() > 0.92)

    def col_is_background(x: int) -> bool:
        return bool(checker[:, x].mean() > 0.92)

    top = 0
    while top < height - 1 and row_is_background(top):
        top += 1
    bottom = height - 1
    while bottom > 0 and row_is_background(bottom):
        bottom -= 1
    left = 0
    while left < width - 1 and col_is_background(left):
        left += 1
    right = width - 1
    while right > 0 and col_is_background(right):
        right -= 1

    alpha = np.zeros((height, width), dtype=np.uint8)
    alpha[max(0, top - 1) : bottom + 2, max(0, left - 1) : right + 2] = 255
    image = np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), alpha])
    Image.fromarray(image, "RGBA").save(dst, optimize=True)


if __name__ == "__main__":
    source = Path("/tmp/assets")
    flood(source / "asset-01-hero-core.jpg", OUT / "hero-core.png", 14, 168)
    flood(source / "asset-02-tilt-badge.jpg", OUT / "tilt-badge.png", 12, 176)
    flood(source / "asset-03-grid-cluster.jpg", OUT / "grid-cluster.png", 18, 160)
    crop_margin(source / "asset-04-cursor-blueprint.jpg", OUT / "cursor-blueprint.png")
