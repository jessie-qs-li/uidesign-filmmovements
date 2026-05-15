# VibeLens Design System

> **Learn to see what the director sees.**
> A design system for *VibeLens* — a self-paced digital lesson teaching casual moviegoers how to identify camera movements in film, built for a Columbia Instructional Design course (Film Literacy for Casual Moviegoers).

---

## The product in one paragraph

VibeLens teaches **Alex** — a college-aged casual moviegoer with no filmmaking background — to name the camera movements they already feel. The pedagogy is **observation-first**: every technique is anchored to a *"Feels Like"* hook (the emotional effect) before its name is introduced. The lesson covers 13 camera movements (pan, tilt, dolly, zoom, handheld, pedestal, dolly zoom, …) and is reinforced by three quiz rounds built on recognizable film clips (*Fargo*, *The Dark Knight*, *Jaws*, etc.) with animated overlays highlighting the visual cues.

Two surfaces exist today:

| Surface | What it is | Status |
| --- | --- | --- |
| **Lesson web app** (`uidesign-filmmovements/`) | Flask app — Home → Practice (4 lessons w/ webcam try-it-yourself) → Quiz (drag-camera-to-Bob) → Results | Lo-fi prototype, assessed as the team's most promising direction |
| **Lesson deck** (`HW11_Graphic_Design.pptx`) | Hand-off design system slides — color palette, type, hierarchy across 5 screen types | Higher-fi visual target |

This design system codifies the **higher-fidelity Black Bean direction** (dark theme, Georgia + Calibri). The existing illustrated brand assets (Bob, Laura, the camera silhouettes) are preserved and re-skinned to live inside the dark theme. The lo-fi prototype's blue/Sketchbook palette is **not** part of this system — only its content and logic flow are referenced.

## Sources

- **Codebase (read-only mount):** `uidesign-filmmovements/` — Flask + Jinja, `templates/{home,learn,quiz,results}.html`, `static/style.css`, `static/script.js`, `app.py`. Assets: `bob-{happy,smirk,neutral,angry}.png`, `laura.png`, `tv-frame.png`, `cam-{tripod,handheld,tracking,dolly-zoom}.png`, four lesson `.mp4`s.
- **PPTX:** `uploads/design-system.pptx` — three slides: COLOR SYSTEM, VISUAL HIERARCHY, TYPOGRAPHY. Defines the dark palette and type scale used here.

---

## Index — what's in this folder

| Path | Purpose |
| --- | --- |
| `README.md` | This file. Brand, content, visual foundations, iconography. |
| `SKILL.md` | Agent-Skill manifest so this system can be invoked from Claude Code. |
| `colors_and_type.css` | All design tokens — colors, type scale, spacing, radii, motion, shadows. Drop into any HTML. |
| `assets/` | Real visual assets — characters, TV frame, camera icons, video clips. **Use these, don't redraw.** |
| `assets/videos/` | Four reference `.mp4` clips used in lessons + quiz. |
| `preview/` | Cards rendered in the **Design System** tab. One concept per card. |
| `ui_kits/lesson-app/` | High-fi recreation of the lesson web app (Home, Learning, Quiz, Results). |
| `slides/` | Lesson-deck templates (Title, Definition, Comparison, Quiz, Transition, Final Score). |
| `uploads/` | Originals: `design-system.pptx`. |

---

## Content fundamentals

**Voice — warm, observational, never academic.** VibeLens never lectures; it points. Copy starts with *what you saw* and only then names the technique.

- **"Feels Like" framing.** Every technique is introduced as a sensation first.
  - ✅ *"Feels like the room is shrinking around you. → That's a Dolly Zoom."*
  - ✅ *"Tracking has the camera follow or find the characters, making the viewers feel like they're in the movie."* (from `app.py`)
  - ❌ *"A dolly zoom is a cinematographic technique in which the camera…"*
- **Second person, present tense.** Address Alex directly: *"you see"*, *"you feel"*, *"watch how"*. Never first-person plural ("we").
- **Plain English, no jargon without a hook.** Technical names appear *after* the feel. When a name is introduced, italicize or set it in the display serif so it reads as a proper noun.
- **Short. Conversational.** ~14-word sentences. One idea per line on screen. Body copy on the lesson screen runs ~14–22 words.
- **Examples are real movies, cited inline.** Format: *"Ex. Goodfellas, 1990 — 2:12"* (italic, Calibri 11px, muted). Always year + optional timestamp.
- **CTAs are imperative verbs, single word when possible.** `START`, `NEXT →`, `SUBMIT`, `RETRY`. ALL-CAPS, letter-spaced, on the Lava Red button.
- **Bob's voice is playful, slightly clueless.** *"I want to recreate this scene! Please pass me the correct camera."* He's the hapless director — Alex is the expert helping him.
- **Casing.** Title Case for screen titles and technique names (*"Dolly Zoom"*, *"Camera Movements"*). Sentence case for body and definitions. UPPER CASE only for buttons, eyebrows, and tags.
- **No emoji in product surfaces.** The system uses real illustrations and SVG icons; ✓ / ✗ are acceptable for quiz feedback.
- **No filler.** If a slide has nothing to add, leave whitespace. The composition does the work.

**Sample copy bank**

```
Eyebrow:    01 — CAMERA MOVEMENT
H1:         Dolly Zoom
H2:         Camera Movements
H3:         Learn to see what the director sees
Body:       A dolly zoom keeps a subject in frame while the world
            warps behind them. It's the feeling of standing still
            while reality leans in.
Caption:    Ex. Vertigo, 1958 — 1:14
Button:     START   ·   NEXT →   ·   SUBMIT   ·   RETRY
Bob says:   "I want to recreate this scene! Please pass me the
             correct camera."
```

---

## Visual foundations

**Black Bean. One theme, no exceptions.**
A near-black forest-green page, generous negative space, tight italicized serifs, restrained accent reds and lemon-lime correctness cues. It frames every film clip like a darkened theater. Bob and Laura sit inside the dark — they're characters in a screening room, not a sketchbook.

### Color
- **Black Bean #081910** — page bg, nav rail, theater-darkness around content.
- **Forest Panel #142E1E** — every card / definition tile / answer chip / modal.
- **Muted Forest #4A6B54** — captions, timestamps, slide counters, hint copy. Never used for primary text.
- **Near-White #F2F2EE** — *all* primary text, headings, body, question prompts. Never pure `#fff`.
- **Lava Red #E42217** — single accent for primary CTAs, selected quiz answer, error state. **One per screen, max.**
- **Lemon Lime #A9ED3D** — correctness only: progress bar fill, score callout, ✓ glow.
- **Fresh Green #34CD3F** — icon fills and active nav indicator (a step lower in chroma than Lemon Lime).

Color discipline: think of red and lemon-lime as *signals*, not decoration. If a screen has no action and no correctness signal, it's monochrome navy-and-cream.

### Type
- **Display:** Georgia (system serif). Bold for H1, Bold Italic for H2, Italic Regular for H3.
- **Body:** Calibri (Microsoft) → falls back to **Carlito** (Google Fonts, metric-compatible), then Segoe UI. ⚠ See *Type Substitutions*.
- **Mono:** JetBrains Mono / SF Mono — used only for keyboard hints and code-style chips.
- **Scale:** 36 / 24 / 16 / 14 / 13 / 11. Tight leading on headings (1.15), generous on body (1.55).
- **Italic is a feature, not an accent.** H2 and H3 are italic. So are film references and Bob's speech bubble.

### Spacing & layout
- **4-pt base.** Tokens: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.
- **Container width:** 960px content area on desktop. Sidebar 200px. Right rail 240px.
- **Generous breathing room.** Section gaps default to 32–48px. Cards have 24px internal padding.
- **Fixed elements:** the left **nav rail** (lesson list) and the bottom **progress bar** are persistent during a lesson. Everything else scrolls.

### Backgrounds & texture
- **Solid Black Bean.** No gradients in the primary theme. Depth is achieved with elevation steps (`bg-1` → `bg-2` → `bg-3`), not color washes.
- **Film clip = full-bleed, rounded-corner panel** (`--vl-radius-lg`). The TV-frame illustration is reserved for the Sketchbook theme.
- **No repeating patterns. No noise/grain.** The aesthetic is editorial and clean — like a museum wall caption.

### Animation
- **Subtle, ~120–380ms,** `cubic-bezier(0.2, 0.7, 0.2, 1)` (snappy out, soft in).
- **Fades and translates only.** No bounces, no springs, no parallax.
- **Correctness gets a brief glow,** not a confetti burst: `box-shadow: 0 0 0 3px rgba(169,237,61,0.35)` for ~600ms.
- **Drag-and-drop (quiz):** dragged camera goes to 0.4 opacity; the drop zone fills with the camera at full size on release; 700ms pause before advancing — long enough to register the choice, short enough to feel responsive.

### Hover & press
- **Buttons:** hover lifts saturation +5%, adds an outer glow ring; press = `translateY(1px) scale(0.98)`.
- **Tiles / cards:** hover = border-color steps up (`--vl-border-1` → `--vl-border-2`), no transform.
- **Nav rail:** active state is filled accent panel; hover is `bg-3`.

### Borders
- **Hairlines.** `1px` only, in `rgba(text, 0.10)` for resting state, `0.22` for emphasis.
- **No double borders, no inner strokes, no left-only accent borders.**

### Shadows
- Three steps, all warm-black:
  - `sm` — `0 1px 2px rgba(0,0,0,0.4)` (chips, pills)
  - `md` — `0 4px 14px rgba(0,0,0,0.45)` (cards, panels)
  - `lg` — `0 18px 40px rgba(0,0,0,0.55)` (modals, focus overlay)
- Glow rings (`accent`, `correct`) replace shadows on interactive states.

### Corner radii
- **Soft, slightly hand-drawn.** 4 / 8 / 12 / 18 / 28 / pill.
- **Buttons are pill-shaped** (`--vl-radius-pill`) — a friendly counterpoint to the dark, editorial type.
- **Cards use `lg` (18px)**.

### Transparency & blur
- Used **only** when content visually overlaps a film clip (HUD overlays, the Q1/3 counter, the speech bubble during quiz). Backdrop blur 12px, surface tint `rgba(8,25,16,0.72)`.
- Never on cards in resting state. Surfaces are opaque.

### Imagery vibe
- **Film stills:** desaturated, slightly cool. Always inset in a rounded panel; never bleed to page edge except on the splash/Home of the dark theme.
- **Illustrations (Sketchbook theme):** flat navy line + cool blue fill, on cream/white. They're naive on purpose — Bob is supposed to look like he was drawn during a class.

### Layout rules
- **One primary action per screen.** Lava Red is reserved for it.
- **Type sets the rhythm.** Most screens are: eyebrow → H1 → body → CTA. Visual flourishes (camera icon, film clip) sit in a single dedicated zone.
- **Negative space > containers.** Don't reach for a card unless content needs grouping.

---

## Iconography

**No icon font is used.** The product's "icon" set is actually a small library of **navy-blue silhouette PNGs** of cameras and a single line-drawn TV frame, all hand-illustrated. These are core brand assets and live in `assets/`:

| Asset | Used for |
| --- | --- |
| `cam-tripod.png` | Static / fixed-camera lessons |
| `cam-handheld.png` | Handheld lessons |
| `cam-tracking.png` | Tracking / dolly lessons |
| `cam-dolly-zoom.png` | Dolly zoom lessons |
| `tv-frame.png` | The doodle CRT frame that wraps every video clip in Sketchbook contexts |
| `bob-{happy,smirk,neutral,angry}.png` | Bob's quiz reactions — keyed to wrong-answer count |
| `laura.png` | The home-screen / "Congrats!" hero character |

**For UI utility icons** (chevron, play, pause, ✓, ✗, drag handle, settings) we use **Lucide** at 1.5px stroke from CDN — chosen for stroke weight and roundness that mirror the cartoon outlines on Bob/Laura.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="chevron-right"></i>
<script>lucide.createIcons();</script>
```

⚠ **Substitution flagged:** the original deck doesn't specify utility icons. Lucide is our pick; swap if the team has another system in mind.

**Emoji policy.** The lo-fi codebase uses ⏺ ⏹ ▶ ⬇ ↩ ⚠️ for the webcam try-it-yourself controls. In the higher-fi system these are replaced with Lucide equivalents (`circle-dot`, `square`, `play`, `download`, `corner-down-left`, `triangle-alert`). The single exception is **✓ / ✗** in the quiz results review, where the glyph itself reads cleanly at small sizes.

**Unicode used as iconography:** `→` in CTAs (`START →`, `NEXT →`), `·` as a separator in type specimens (`Georgia · 36px · Bold`), and `—` em-dashes in eyebrow tags (`01 — CAMERA MOVEMENT`).

## Type substitutions

⚠ **Calibri** is Microsoft-licensed and not redistributable.
- **Online substitute:** **Carlito** (Google Fonts) — metric-compatible with Calibri, free under SIL OFL. Already wired in `colors_and_type.css`.
- **If you have Calibri locally:** the CSS lists it as the next fallback, so installed copies are picked up automatically.
- **Action for the user:** if the team has a licensed Calibri webfont (or wants to swap to a true open replacement like *Inter* or *Source Sans 3*), drop the `.woff2` into `fonts/` and update the `@font-face` block at the top of `colors_and_type.css`.

Georgia is a system serif on macOS, Windows, iOS, and Android — no substitution needed.
