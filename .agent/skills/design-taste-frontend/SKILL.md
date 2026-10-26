---
name: design-taste-frontend
description: Anti-slop frontend design framework adapted from https://github.com/Leonxlnx/taste-skill. Enforces explicit Design Read, Three Tunable Dials (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY), Section-Layout-Repetition Ban, Bento Cell Count Rule, Typography/Color locks, and GPU-only micro-interactions.
---

# Design Taste Frontend (`Leonxlnx/taste-skill`)

## 0. Brief Inference & The "Design Read"
Before generating or refactoring UI code, declare a one-line **Design Read** and configure the three tunable dials (1–10):
- **`DESIGN_VARIANCE`** (default `8`): Controls structural asymmetry, editorial splits, spanning bento grids, and index ledgers vs. symmetric templates.
- **`MOTION_INTENSITY`** (default `6`): Governs `transform` and `opacity` micro-interactions (`cubic-bezier(0.22, 1, 0.36, 1)`), subtle image scale reveals, and tactile button states.
- **`VISUAL_DENSITY`** (default `4`–`5`): Balances editorial breathing room with crisp `1px solid` hairline ledger structure and `tabular-nums` telemetry.

## 1. Anti-Slop Architectural Rules
1. **Section-Layout-Repetition Ban**: Never stack uniform 3-card or 4-card equal grids back-to-back. Every landing page must use at least **4 distinct layout families**:
   - *Asymmetrical Split Hero with Overlapping Telemetry Plate*
   - *Asymmetrical Spanning Bento Grid (`7 + 5` / `5 + 7` columns; $N$ items = $N$ cells, zero orphan cells)*
   - *Editorial Numbered Index Ledger (Full-width horizontal specification rows with image preview)*
   - *Flagship Spotlight + Stacked Secondary Cards (`1 dominant + 2 stacked` instead of 3 equal columns)*
   - *Architectural Dark Blueprint Grid (`1px solid` hairline cell borders)*
2. **Typography Hierarchy**:
   - Pair high-contrast editorial serif (`Playfair Display`, tracking `-0.04em`) with clean geometric sans (`DM Sans`) and monospaced technical metadata (`ui-monospace`, `tabular-nums`).
   - Never use pure `#000000` for body copy; use warm charcoal/off-black (`#1F2419`) with relaxed line height (`1.65`–`1.85`).
3. **Color & Surface Discipline**:
   - Lock to a single cohesive surface palette (`#F8F5F0` paper, `#F2EDE4` warm stone, `#FFFFFF` card surface) and one primary accent (`#3D4F22` botanical olive ink).
   - Ban generic multi-color neon badges, random purple/indigo glows, and heavy drop shadows. Use `1px solid` structural hairlines and ultra-diffuse elevation (`< 0.05` alpha).
4. **Copy & Punctuation Discipline**:
   - Avoid AI em-dash (`—`) overuse in marketing copy; prefer architectural middle dots (`·`), slashes (`/`), or crisp two-sentence phrasing.
5. **Performance & Motion Guardrails**:
   - Animate only `transform` and `opacity` with `cubic-bezier(0.22, 1, 0.36, 1)`.
   - Respect `@media (prefers-reduced-motion: reduce)`.
