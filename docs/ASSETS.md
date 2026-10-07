# Asset generation

Four studio assets, one art direction: machined metal, frosted glass, copper, chartreuse light, no environment. They were generated for this portfolio and saved under `public/assets/`. The generator returned JPEG files with a baked checkerboard, so a flood-fill knocked the backdrop out to PNG alpha before the files were committed.

## Prompts

**ASSET_01, hero subject** → `public/assets/hero-core.png`

> A hyper-realistic 3D rendering of a central technological core (a quantum computer node), brushed dark metal and smoked glass, a warm copper ring, a thin chartreuse inner filament, studio rim lighting, 8k resolution, highly detailed, isolated entirely on a transparent background.

**ASSET_02, tilt badge** → `public/assets/tilt-badge.png`

> A modern UI/UX digital identification badge, glassmorphism style, translucent frosted glass with holographic typography reading ELENA VOSS and DESIGN ENGINEER, soft drop shadow, isometric angle, isolated on a transparent background.

**ASSET_03, grid floating asset** → `public/assets/grid-cluster.png`

> A cluster of glowing, abstract 3D geometric shapes (a frosted sphere, a smoked cube, a copper prism) constructed from frosted glass and neon, floating in zero gravity, soft ambient occlusion, isolated on a transparent background.

**ASSET_04, cursor reveal** → `public/assets/cursor-blueprint.png`

> A minimalist, high-contrast architectural blueprint certificate of practice for Elena Voss, viewed strictly top-down, sharp typography, isolated on a transparent background.

The plate is a cursor prop. The HTML never describes Elena as a licensed architect.

## Knockout

Checkerboard pixels are near-neutral and bright. Objects were separated by a flood fill from the image edges through pixels with low saturation and high luminance. The certificate is a cream rectangle that touches those colors, so it was keyed by cropping the checker margin instead of flooding.

Re-run, after replacing the JPEGs in `/tmp/assets`:

```bash
python3 scripts/knockout.py
```

The script used for the committed PNGs lives below as the record of the parameters.

```python
# Edges flood: sat <= 14 and luminance >= 168 for the core.
# Badge: sat <= 12 and luminance >= 176.
# Cluster: sat <= 18 and luminance >= 160.
# Certificate: crop rows and columns that are > 92% checker.
```

Parameters that are too loose eat the frosted badge and the white sphere. Parameters that are too tight leave a gray fringe. Inspect the alpha channel at the corners after any regeneration: corner alpha must be `0`, and the copper rim must still be opaque.
