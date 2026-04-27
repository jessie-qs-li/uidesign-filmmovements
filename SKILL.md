---
name: vibelens-design
description: Use this skill to generate well-branded interfaces and assets for VibeLens — a film-literacy lesson product teaching casual moviegoers to identify camera movements — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick start
- Drop `colors_and_type.css` into any HTML — it ships every design token (`--vl-*`) plus opinionated styles for `h1`-`h3`, `p`, `label`, `small`, `code`.
- Theme is **Black Bean** — dark, editorial. There is no light mode. Bob, Laura, and camera silhouettes sit inside the dark theme.
- Real character + camera + TV-frame illustrations live in `assets/`. **Use them.** Never redraw via SVG.
- For UI utility icons, use **Lucide** from CDN.
- Voice: observation-first, "Feels Like" framing, second person, short sentences, no emoji.
- Body sans is **Carlito** (Google Fonts metric-substitute for Calibri); display serif is **Georgia** (system).

## Files
- `README.md` — full system docs
- `colors_and_type.css` — tokens + element styles
- `assets/` — characters, camera silhouettes, TV frame, video clips
- `ui_kits/lesson-app/` — high-fi recreation of the lesson web app
- `slides/` — lesson-deck templates
- `preview/` — design-system tab cards (informational)
