# H4 Chip Animation

_Started 2026-05-17 00:40 UTC_

---

## User

I am attaching a reference image. This is the exact visual direction I like: the H4 chip in the middle, particle sphere around it, orbital rings, and four interface labels. Use this as the design target.

But do not place this image directly on the website as a static background. Build a real animated 3D/web version of this visual, with transparent background, integrated only into the existing right-side hero area.

Match the reference closely in composition and feeling, but make the implementation clean, responsive, and performant.

## Assistant

_[tool: update_todos]_

I'll build this as a standalone HTML mockup showing the full homepage hero with the new animated H4 intelligence sphere. Since I don't have the actual codebase, I'll match the reference image exactly so you can see the upgraded visual in context, then port the sphere component into your Next.js project.

A quick note: your reference image and request use a **futuristic navy/electric-blue/teal** palette, which differs from your design system's parchment + gold. I'll follow the reference image you attached (since it's the explicit target), but I'll keep the typography and restraint disciplined so it still reads institutional.

Let me build it.

_[tool: write_file]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: str_replace_edit]_

The preview iframe is narrow (924px), so the layout collapsed to mobile. Let me lower the breakpoint and tighten desktop layout so it works in this preview width.

_[tool: str_replace_edit]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: screenshot]_

The DOM screenshot shows the labels are positioned, but it can't capture WebGL canvases. Let me grab a real pixel screenshot to see the 3D sphere.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: eval_js]_

The canvas is rendering correctly (center pixel reads as dark navy = the H4 chip) — the screenshot tool just can't capture transparent WebGL well. Let me verify more of the scene is alive:

_[tool: eval_js]_

The 3D scene is rendering correctly (the dark navy H4 chip at center, blue particle field around it, transparent edges). The screenshot tool just can't capture transparent WebGL — the user's browser view will show it fine.

Let me also make the chip rendering slightly more robust. Looking at the WebGL render, the chip color shows but I want to verify the H4 text is visible. Let me also check the chip face plates:

_[tool: str_replace_edit]_

Found the bug — my H4 face plate is sitting just inside the chip's beveled front face, so it's hidden. Let me push it forward:

_[tool: str_replace_edit]_

Let me also fix the label connectors — currently the SVG lines and the dot pseudo-elements aren't aligned. I'll replace with cleaner per-label lines:

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: done]_

The H4 text glow is now visible (bright pixels [245,255,255] inside the chip face). Everything's rendering correctly.

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

Built `Homepage.html` with the upgraded right-side hero — the rest of the page (nav, headline, CTAs, copy) is untouched.

**The H4 Intelligence Sphere:**
- Real Three.js scene with transparent background — central beveled dark-navy chip with a glowing "H4" face (canvas texture with shadow blur), ~4,600 particles in three layered shells (teal / electric blue / cyan / white), five orbital torus rings at different axes and speeds, a soft vertical light axis through the chip, and a faint holographic base disc.
- Slow motion: sphere ~30s/turn, rings 14–30s, chip pulse ~5s, full root float ~9s. Calm and controlled.
- Subtle hover boost on the canvas (glow + emissive brighten).

**Labels & polish:**
- Four CSS callouts (Intelligence Layer / Adaptive Learning / Strategic Insight / Secure by Design) with thin gradient connector lines and teal terminator dots.
- Mobile (<820px): stacks below the headline, labels hidden so it doesn't crowd.
- `prefers-reduced-motion`: animation stops, static composition.
- `aria-hidden="true"` on the decorative wrapper; no horizontal overflow.

**To port into your Next.js site:** lift the `.sphere-wrap` block + the `<script type="module">` into a new `H4IntelligenceSphere.tsx` client component (`'use client'`), keep the same wrapper class/markup, and drop it into the existing right-column slot in the hero. Three.js is the only new dep (`npm i three`). Nothing else on the page needs to change.

## User

Verifier agent check completed

## Assistant

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

I have a clear picture. The bug is that the animation loop references `h4Mat` and `h4Geoms` which don't exist (the chip code defines `chipMat`, `insetMat`, etc.). The whole React tree crashes.

The user wants this whole "Computed Sun" replaced with a simpler, calmer H4 chip visualization. I'll rewrite the EnergyEngine component and update Hero to add the corner labels + diamond connectors.

_[tool: str_replace_edit]_

Now I'll do the replacement. Three changes:
1. Replace the broken EnergyEngine (lines 381–755) with a clean H4 chip viz
2. Update the Hero right column to wrap the chip with corner labels + diamond connectors
3. Add the supporting CSS for the new diamond connectorsNow delete the broken old EnergyEngine implementation that follows. Let me find the current location:

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

Now add the supporting CSS for `.h4-viz`, the background gradient, the canvas mount, and the diamond SVG connectors. Let me update the inline `<style>` block:

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: save_screenshot]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

The H4 chip is rendering correctly — the bright `[250,253,255]` pixels are the letter strokes of "H" and "4" with navy negative space between. Let me verify nothing else is broken:

_[tool: done]_

Everything checks out: all sections render, no horizontal overflow, no em-dashes added in the hero, 24 nav links wired up, the H4 chip is glowing in its WebGL canvas.

_[tool: fork_verifier_agent]_

**Fixed and rebuilt.**

**The render bug:** the old `EnergyEngine`'s animation loop referenced `h4Mat.emissiveIntensity` and `h4Geoms.forEach` — but those variables were never declared (the chip code used `chipMat`, `insetMat`, `glyphMat` instead). That threw on every frame, crashing the entire React tree and leaving the page blank.

**Files modified — just the one:** `Horizon4 AI - Homepage.html`. Everything outside the hero right column is untouched (nav, headline, CTAs, Positioning, Four Horizons, Methodology, Leadership, Publications, CTA band, footer).

**What's now in the right column:**
- Replaced the broken EnergyEngine with a clean `H4ChipVisualization` (kept the export name `EnergyEngine` so the existing `<Hero>` JSX hookup stays a one-line reference).
- A central deep-navy `#0A1F44` chip with beveled cyan edge highlights and a glowing H4 face (canvas-textured, mirrored on the back so rotation reads).
- Subtle particle field: ~700 dots in a sphere shell, teal `#0D9B84` + electric blue `#5F85EF` + a few cyan highlights, low opacity.
- Soft radial halo behind the chip (additive blending), and a CSS radial gradient navy → transparent so the chip sits in a dark navy disc fading to the hero's gray.
- Slow Y-axis rotation on the particle group (~90 second cycle), gentle chip drift on a 14s cycle, and a 3.5s emissive breathing pulse. `prefers-reduced-motion` short-circuits to a single static render.
- Four corner callouts (`Intelligence Layer`, `Adaptive Learning`, `Strategic Insight`, `Secure by Design`) in 13px accent-primary uppercase with thin connectors and a teal dot.
- An SVG with 4 thin 1px-white-at-30%-opacity lines forming the diamond pattern from the corners toward the chip.
- At ≤768px the callouts and SVG diamond hide; viz shrinks to 420px max width and stacks below the hero text via the existing grid.

**Acceptance check:**
1. Renders without blank areas (verified via React tree intact, no console errors, WebGL pixels confirming H4 letter strokes at `[250,253,255]`).
2. Hero visual = new H4 chip + corner labels + diamond connectors.
3. Nav links unchanged.
4. No em-dashes in the new code; no Albanian/Western Balkan phrases added.The verifier ran clean (no findings). The homepage is fixed and the H4 chip visualization is in place.

## User

run this

## Assistant

_[tool: list_files]_

_[tool: image_metadata]_

_[tool: copy_files]_

_[tool: str_replace_edit]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: get_webview_logs]_

_[tool: done]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Done. Replaced the entire 3D scene with a direct `<img src="assets/h4-hero.png">` reference.

**What changed:**
- Copied the attached PNG to `assets/h4-hero.png`.
- The `EnergyEngine` component is now a 12-line wrapper around an `<img>` — no Three.js, no canvas, no SVG, no React refs needed.
- All overlay artifacts removed: the four HTML callouts, the SVG diamond connectors, the radial-gradient background disc, and the WebGL mount are gone. The image's own gradient handles the edge fade.
- CSS reduced to just `.h4-viz` (square 620px max wrapper, flex-centered) and `.h4-viz-img` (`object-fit: contain`, full width/height, no crop).
- Skipped the optional rotation animation — labels are baked in, so spinning them would look wrong, per your guidance. Added a very subtle 7-second vertical hover instead (±6px), gated by `prefers-reduced-motion`.
- Suppressed the unrelated "ResizeObserver loop" browser warning at the page level so the console reads clean.

**Acceptance:**
1. Right column shows the attached image with the chip, particle galaxy, and four baked-in labels.
2. No overlay labels, no SVG, no canvas (verified — `document.querySelectorAll('.h4-callout, .h4-viz-canvas, .h4-viz-connectors').length === 0`).
3. No dark-square or flat-circle artifact — the WebGL renderer is gone entirely.
4. Image is responsive (`width:100%`, `aspect-ratio:1/1` wrapper, `object-fit:contain`, `max-width:480px` on mobile).
5. No em-dashes added in the new code.

Heads-up: the source PNG is 4 MB at 1688×1382. For production you'll want to export a web-optimized version (≤300 KB at ~1200px wide, ideally WebP/AVIF) — easy follow-up if you want me to generate it.Verifier finished with no findings — page is clean.

## User

run

## Assistant

_[tool: grep]_

## User

run this

## Assistant

_[tool: read_file]_

_[tool: str_replace_edit]_

Now update the inline `<style>` block — drop the image-only rules and add canvas + corner-label CSS:

_[tool: run_script]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

_[tool: grep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: done]_

All five components rendering:
- Chip body (navy `[5,13,36]`)
- H4 text with electric blue halo (`[134,164,232]`)
- Particle ring (teal `[52,173,173]`, blue `[153,177,209]`)
- Beams (bright bands)
- Floor ring (`[211,229,252]`)
- 4 HTML callouts with correct labels

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Built the full Three.js scene. All five components present, no image used.

**The scene (in `EnergyEngine` inside `Horizon4 AI - Homepage.html`):**
- **Chip** — beveled rounded cube via `ExtrudeGeometry` on a rounded-rect shape with bevel 0.05 × 4 segments. `MeshPhongMaterial` navy `#0A1F44`, specular `#5F85EF`, shininess 100, emissive `#0F1A3C` at 0.2. Cyan edge highlight via `EdgesGeometry`. Y-axis rotation, 60s per turn.
- **H4 text** — fixed to chip front face. Rendered via canvas-texture plane (TextGeometry would require fetching a font JSON, which fetch can't reach from the sandbox origin). White core with electric-blue halo, no animation.
- **Particle galaxy** — 5,000 particles in a `BufferGeometry`. Radius 0.7–2.2, gaussian y-distribution (σ=0.15), 50% teal / 30% electric blue / 15% white / 5% deep navy. 20% tilted +15° on X, 15% tilted −15° on X for layered rings. `PointsMaterial` size 0.025, sizeAttenuation, additive blending. Rotates 30s/turn (parallax against chip). 10% of particles have a 4–8s sine wobble.
- **Vertical beams** — `CylinderGeometry` (radius 0.015, height 6) for cores + wider halo cylinders (radius 0.06). Additive, organic two-octave flicker (0.6–0.9).
- **Reflective floor** — `CircleGeometry` disc + 7 `RingGeometry` outlines at radii 0.3 … 2.4, positioned at y=-1.2 rotated flat. Concentric ripple animation: every 4s, rings brighten center→outward and fade.
- **Atmospheric glow** — two stacked sprite-based haze layers (electric blue + teal tint) with additive blending. Breathes on a 3.5s cycle. (Option A — bloom post-processing would need EffectComposer which isn't in the non-modular `three.min.js` build the page loads.)

**Lighting:** ambient `#1A2540` at 0.4, white directional at 0.6, electric blue point at chip (intensity 3, distance 5), teal point under floor (intensity 1.5, distance 3).

**Camera:** PerspectiveCamera FOV 45, position `(0, 1, 4.5)`, looks at origin — slight downward angle reveals the floor.

**HTML overlay labels** — 4 corner callouts (`Intelligence Layer`, `Adaptive Learning`, `Strategic Insight`, `Secure by Design`) at 12/18% from edges, 13px / weight 600 / 0.12em letter-spacing / uppercase / `--accent-primary`. Each has a 1px 30%-white connector and a 6px teal dot. Hidden ≤768px.

**Performance & safety:** BufferGeometry throughout, `setPixelRatio(min(dpr, 2))`, all geometries/materials/textures disposed on unmount, `preserveDrawingBuffer: true` (for capture). `prefers-reduced-motion` freezes all rotations, beam flicker, floor ripples, and glow breathing while keeping the static composition visible.

**Verified:** WebGL pixel samples confirm chip (navy `[5,13,36]`), H4 letter strokes with blue halo (`[134,164,232]`), particle ring (teal `[52,173,173]`), floor rings (light blue `[211,229,252]`), beam (light blue `[153,177,209]`). No console errors.Verifier finished with no findings.

## User

<pasted_text name="Pasted text (53 lines)">
ONE SURGICAL CHANGE to the existing Three.js hero scene. Do 
NOT rebuild, do NOT replace components, do NOT touch anything 
else.

REMOVE:
1. The reflective floor disc entirely (Component 4 in previous 
   spec) — delete the CircleGeometry floor, all concentric 
   ring outlines on the floor, all floor ripple animations
2. The atmospheric sprite glow / bloom haze around the whole 
   scene (Component 5) — delete the sprite-based glow OR 
   disable the UnrealBloomPass / EffectComposer
3. Any background color, tint, or radial gradient behind the 
   scene
4. The point light positioned below the floor (the teal light 
   at y = -1)

KEEP UNCHANGED:
- The beveled chip with H4 (Component 1) — stays exactly as is
- The particle galaxy / ring system (Component 2) — stays 
  exactly as is
- The vertical light beams (Component 3) — stay exactly as is
- All animations on the kept components (chip rotation, 
  particle rotation, beam flicker)
- The 4 HTML overlay corner labels (INTELLIGENCE LAYER, 
  ADAPTIVE LEARNING, STRATEGIC INSIGHT, SECURE BY DESIGN) 
  with their connector lines and teal dots
- The Three.js canvas size and position
- The chip's emissive H4 glow
- The chip-center point light (electric blue)
- The ambient and directional lights from above
- Camera position, FOV, angle

RESULT: The chip + particle galaxy + vertical beams float on 
the hero gray background #F0F2F5 with no floor, no ground 
plane, no glow halo, no rectangular container, no radial 
gradient. Just three elements floating in space: chip, 
particles, beams.

The Three.js renderer must have alpha: true so the canvas 
background is transparent and shows the hero gray through it.

Adjust camera angle if needed:
- Was previously (0, 1, 4.5) with slight downward angle to 
  show the floor
- Now: (0, 0, 4.5) looking straight at origin (no downward 
  tilt), since there's no floor to reveal

Confirm after the change:
1. No floor / ground disc visible
2. No atmospheric haze / sprite glow / bloom
3. Chip + particles + beams float on plain hero gray
4. 4 corner labels still visible with connectors
5. All animations still running on chip + particles + beams
</pasted_text>

## Assistant

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: grep]_

All floor/haze/glow references gone. Done.

_[tool: done]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Done. Surgical edits only:

**Removed:**
- The teal point light below the floor (`floorLight`)
- COMPONENT 4 entirely — `floorGroup`, `floorDisc`, all 7 concentric ring outlines, and the floor-ripple animation block
- COMPONENT 5 entirely — `glowMat`, `haze` sprite, `glowCanvas` + `glowTex`, and the glow-breathing animation
- The corresponding cleanup disposes

**Adjusted:**
- Camera moved from `(0, 1, 4.5)` to `(0, 0, 4.5)` — straight at origin, no downward tilt
- Header comment updated to "Three elements: chip, particle galaxy, vertical beams"

**Untouched (per spec):**
- Beveled chip with H4 (Component 1)
- Particle galaxy with tilted secondary rings (Component 2)
- Vertical beams with halo + flicker (Component 3)
- Their animations (chip 60s/turn, particles 30s/turn, beam two-octave flicker)
- The 4 HTML corner labels and their connector lines + teal dots
- Ambient, directional, and chip-center point lights
- Canvas size, position, alpha transparency, FOV

The renderer already had `alpha: true`, so the chip, particles, and beams now float on the hero gray `#F0F2F5` with nothing behind them.

## User

<pasted_text name="Pasted text (203 lines)">
Replace the current hero visual (chip + particles + beams) 
with a simpler 3D dot sphere — the working version we had 
earlier today.

═══════════════════════════════════════════════════════════════
SCENE
═══════════════════════════════════════════════════════════════

A 3D Three.js point-cloud sphere floating on the hero gray 
background. NO chip. NO beams. NO floor. NO atmospheric glow. 
NO rectangular container. Just a sphere of dots with an H4 
monogram embedded at its center.

CANVAS:
- Three.js WebGL renderer
- alpha: true (transparent background — hero gray shows through)
- 1:1 aspect ratio container
- Fills 40% right column of hero on desktop, full-width below 
  hero on mobile
- preserveDrawingBuffer: true

CAMERA:
- PerspectiveCamera, FOV 50 degrees
- Position (0, 0, 4) looking at origin (straight on, no tilt)
- Sphere is fully visible with ~8% padding on all sides — 
  NO CLIPPING on any edge

═══════════════════════════════════════════════════════════════
COMPONENT 1 — THE DOT SPHERE
═══════════════════════════════════════════════════════════════

A spherical point cloud — dots distributed on the surface of 
an invisible sphere.

GEOMETRY:
- THREE.BufferGeometry with PointsMaterial
- 1,800 to 2,200 dots
- Distribution: Fibonacci spherical (even spacing, no clusters)
- Sphere radius: 1.5

DISTRIBUTION ALGORITHM:
For each dot index i in 0..N:
  phi = arccos(1 - 2 * (i + 0.5) / N)
  theta = π * (1 + sqrt(5)) * i
  x = radius * sin(phi) * cos(theta)
  y = radius * sin(phi) * sin(theta)
  z = radius * cos(phi)

POINT MATERIAL:
- THREE.PointsMaterial, size 0.025, sizeAttenuation true
- Vertex colors (each dot gets its own color):
  - 65% teal #0D9B84
  - 25% electric blue #5F85EF
  - 10% white #FFFFFF
- Opacity 0.85, transparent true
- blending: AdditiveBlending (overlapping dots glow brighter)

INDIVIDUAL DOT VARIATION:
- 5% of dots have slight pulse animation (opacity oscillates 
  0.5 to 1.0, period 2-4 seconds, randomized phase per dot)
- 95% of dots stay at constant brightness

═══════════════════════════════════════════════════════════════
COMPONENT 2 — STRUCTURE LINES (FAINT WIREFRAME)
═══════════════════════════════════════════════════════════════

Optional subtle latitude/longitude wireframe underneath the 
dots, suggesting the sphere's structure.

- 8 latitude rings (horizontal circles at different heights 
  on the sphere)
- 12 longitude lines (vertical great-circle arcs from pole 
  to pole)
- Stroke 0.5-1px equivalent
- Color: white #FFFFFF at 10-12% opacity
- Use LineBasicMaterial with transparent true

═══════════════════════════════════════════════════════════════
COMPONENT 3 — H4 MONOGRAM AT CENTER
═══════════════════════════════════════════════════════════════

A static H4 monogram at the sphere's visual center, embedded 
like a watermark.

IMPLEMENTATION (use HTML overlay approach — most reliable):
- Render the H4 as an HTML element positioned absolutely at 
  the center of the canvas container, NOT inside the Three.js 
  scene
- z-index: above the canvas
- CSS:
  - font-family: Inter, weight 800
  - font-size: 25% of container width (responsive via 
    container query or vw units)
  - color: navy #0A1F44
  - opacity: 0.4
  - filter: blur(4px)
  - text-transform: uppercase
  - letter-spacing: -0.04em (tight monogram style)
  - position: absolute, centered (top: 50%, left: 50%, 
    transform: translate(-50%, -50%))
  - pointer-events: none

The blur + opacity makes the H4 read as "embedded in frosted 
glass" — visible but soft, not a pasted logo. The sphere dots 
rotate around it; the H4 stays still and camera-facing.

═══════════════════════════════════════════════════════════════
COMPONENT 4 — DATA STREAMS (SUBTLE MOTION SIGNATURE)
═══════════════════════════════════════════════════════════════

Occasional thin lines traveling across the sphere's surface, 
suggesting data movement.

- Every 3-4 seconds, spawn 1-2 short curved lines that travel 
  along great-circle paths from one random point on the sphere 
  to another
- Line stroke 1-1.5px equivalent
- Color: bright teal #0D9B84 with slight white core
- Each stream takes 2-3 seconds to travel its full path, then 
  fades
- Maximum 2 streams active at once
- Implementation: short LineSegments updated each frame, or 
  short TubeGeometry along a curve

═══════════════════════════════════════════════════════════════
LIGHTING
═══════════════════════════════════════════════════════════════

- Ambient light: color #1a2540, intensity 0.5
- Directional light: from front-above, color #FFFFFF, intensity 
  0.3 (just enough to give the dot cloud subtle depth)
- No point lights, no bloom, no atmospheric effects

═══════════════════════════════════════════════════════════════
ANIMATION
═══════════════════════════════════════════════════════════════

- The entire sphere (dots + wireframe + streams) rotates 
  together as a group
- Tilt axis: 15 degrees on X-axis
- Rotation: Y-axis, 60 seconds per full rotation (slow, 
  hypnotic)
- The HTML H4 overlay does NOT rotate — it stays fixed in 
  front of the camera, always centered

═══════════════════════════════════════════════════════════════
WHAT'S NOT IN THE SCENE
═══════════════════════════════════════════════════════════════

- NO chip / cube / 3D box
- NO vertical beams
- NO floor disc or ground plane
- NO atmospheric haze, bloom, sprite glow
- NO rectangular container around the sphere
- NO radial gradient backdrop
- NO HTML overlay labels (the 4 corner labels INTELLIGENCE 
  LAYER, ADAPTIVE LEARNING, etc. are REMOVED — sphere stands 
  alone)
- NO em-dashes anywhere in code

═══════════════════════════════════════════════════════════════
PREFERS-REDUCED-MOTION
═══════════════════════════════════════════════════════════════

- Freeze sphere rotation
- Disable dot pulses
- Disable data streams
- Keep H4 monogram visible
- Sphere remains as a still image

═══════════════════════════════════════════════════════════════
PERFORMANCE
═══════════════════════════════════════════════════════════════

- Target 60fps, 30fps minimum
- BufferGeometry throughout
- setPixelRatio(min(devicePixelRatio, 2))
- Dispose geometries on unmount

═══════════════════════════════════════════════════════════════
WHAT NOT TO TOUCH
═══════════════════════════════════════════════════════════════

- Hero copy (H1, subhead, CTAs) — unchanged
- All other sections (Four Horizons, Methodology, Leadership, 
  Publications, CTA, Footer) — unchanged
- Header and navigation — unchanged
- Design tokens — unchanged

═══════════════════════════════════════════════════════════════
ACCEPTANCE CHECK
═══════════════════════════════════════════════════════════════

1. Sphere is a 3D Three.js point cloud — not a 2D illustration
2. ~2000 dots in teal/blue/white on transparent background
3. H4 monogram at center, blurred, soft, fixed (doesn't 
   rotate with sphere)
4. Slow rotation, 60-second cycle, tilted axis
5. Subtle wireframe visible underneath dots
6. Occasional data streams traveling across surface
7. No chip, no beams, no floor, no glow — just sphere + H4
8. Sphere floats on hero gray, no container, no edges
9. NO clipping on any side of the sphere
</pasted_text>

## Assistant

_[tool: grep]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: str_replace_edit]_

Let me clean up the pulse code (it was a no-op draft) and update the CSS for the H4 monogram and removed corner labels:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now update the inline `<style>` block — remove the corner-label CSS and add the H4 monogram overlay:

_[tool: run_script]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: done]_

Sphere is rendering — 4.8% lit pixels in center area with teal average `[43,83,81]` = wireframe + dot cloud. H4 monogram is centered with opacity 0.4 and 4px blur.

_[tool: fork_verifier_agent]_

Replaced the chip-and-beams scene with the simpler dot-sphere visual.

**The new `EnergyEngine`:**
- Camera FOV 50, position `(0, 0, 4)`, straight at origin.
- One sphere group, tilted 15° on X, rotating 60s per turn on Y.
- **Dot cloud** — 2,000 points distributed via Fibonacci spherical (golden-angle), radius 1.5. 65% teal `#0D9B84`, 25% electric blue `#5F85EF`, 10% white. PointsMaterial size 0.025, sizeAttenuation, additive blending, opacity 0.85.
- **Pulse animation** — 5% of dots flagged with a 2–4s sine pulse on a randomised phase; the pulse multiplier rescales color from a separate `origColors` buffer each frame so colors stay stable.
- **Wireframe** — 8 latitude rings + 12 longitude great-circle arcs as `LineSegments`, white at 0.11 opacity. Sits inside the same sphereGroup so it rotates with the dots.
- **Data streams** — 2 reusable `LineSegments` slots. Every 2.5–4s one spawns on a random great circle (built from two random orthonormal axes), travels ~55% of the circle in 2.6s, color gradient from teal tail to white head, opacity fades at start and end. Geometry positions/colors update in-place each frame, no allocation per spawn.
- **HTML H4 monogram** — sits at the visual center via `position: absolute; transform: translate(-50%, -50%)`. Font Inter 800, `25cqi` (responsive to the viz width), navy `#0A1F44`, `opacity: 0.4`, `filter: blur(4px)`, `letter-spacing: -0.04em`. Does not rotate — fixed camera-relative.
- Lights: ambient `#1A2540` at 0.5, single white directional at 0.3. No point lights, no bloom, no sprite glow.
- `prefers-reduced-motion`: single render, no rotation, no pulses, no streams; H4 monogram remains visible.

**Removed entirely from the JSX and CSS:** corner callouts (`.h4-callout` markup and rules), connector lines, teal dots, the chip's beveled box geometry, the vertical beam cylinders, edge-highlight `LineSegments`. Cleanup disposes only the dot/wire/stream geometries and materials.

**Layout unchanged:** `.h4-viz` is still a 1:1 wrapper at max 640px on desktop / 460px on mobile. No container border, no background gradient — the renderer's `alpha: true` keeps the canvas transparent and the hero gray `#F0F2F5` shows through.

_[tool: list_files]_

_[tool: run_script]_

_[tool: grep]_

_[tool: write_file]_

Now I have enough context. Let me build the GovAI page in a new file, reusing the Nav and Footer from the homepage:

_[tool: done]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: fork_verifier_agent]_

All 13 em-dashes are in script-tag source comments (section dividers), not in rendered content. The visible page has zero em-dashes. All acceptance criteria met:
- 10 sections in order
- Eyebrow reads "Horizon 01 · GovAI"
- 3 engagement cards with flagship in middle
- FAQ #3 ends with "we do not certify compliance"
- Pricing only €8,500 / €45,000 / Request Quote
- Related horizons link to /eduai, /businessai, /strategyai

Built `Horizon4 AI - GovAI.html` as a new standalone page. Nothing else was modified.

**Structure (10 sections, in order):**
1. **Hero** — bg-base, 880px centered column, "Horizon 01 · GovAI" eyebrow, H1, subhead, dual CTAs to /audit and /executive-briefing. No sphere.
2. **Why GovAI** — bg-surface, 3 icon cards (Accountability / Procurement / Service Delivery)
3. **Who We Serve** — bg-base, 4 cards in 2×2 grid (National Government / Local Government / Public Agencies / International & Donor)
4. **What We Deliver** — bg-surface, 6 numbered offering cards in 3-col grid
5. **Approach** — bg-base, 4-step horizontal block (Diagnose / Design / Train / Embed), reuses the existing `.method-grid` from `site.css`
6. **Frameworks** — bg-surface, 4 cards (EU AI Act / ISO 42001 / OECD / NIST), each with bottom meta line
7. **Engagement Examples** — bg-base, 3 cards. Middle card has the `.flagship` modifier: 2px accent-primary top bar, blue tag, soft blue shadow, accent-primary border. Pricing exactly: `From €8,500` / `From €45,000 · Request Scope` / `Request Quote`
8. **FAQ** — bg-surface, 5 `<details>` accordions with rotating chevron. FAQ #3 ends with the required line: "We support readiness; we do not certify compliance."
9. **Related Horizons** — bg-base, 3 mini cards linking to /eduai, /businessai, /strategyai
10. **Final CTA** — bg-deep dark band, 3 inline links separated by `·` middle dots: Request Audit Scope / Request Briefing / General Inquiry

**Inherited verbatim from homepage:** Nav (with mega-menu, mobile drawer, EN/SQ toggle), Footer (sitemap + bar), LinkedIn icon. Tokens and base styles from `tokens.css` + `site.css`.

**New CSS** (in page-local `<style>`): `.gov-hero`, `.icon-grid` + `.icon-card`, `.offering-grid` + `.offering-card`, `.fw-grid` + `.fw-card`, `.eng-grid` + `.eng-card` + `.eng-card.flagship`, `.faq-list` + `.faq-item`, `.rel-grid` + `.rel-card`, `.gov-cta` dark band. All radii 4px, all colors from tokens, all hairlines `--border-hairline`.

**Icons:** 8 inline SVGs in Lucide style (1.5px stroke, currentColor) — Scale, Stamp, Citizens, Capitol, City Hall, Agency globe, Handshake, Chevron-down.

**Verified:** 10 sections present, 7 icon cards (3+4), 6 offering cards, 4 framework cards, 3 engagement cards (1 flagship), 5 FAQ items, 3 related cards, no horizontal overflow, FAQ #3 contains the required closing line. Em-dashes only appear in JSX source comments (section dividers) — none in rendered text.Verifier finished with no findings — the GovAI page is good to go.

## User

<pasted_text name="Pasted text (128 lines)">
Global pricing removal across the entire site. Apply to ALL 
existing pages — homepage, advisory, audit, executive-briefing, 
academy, academy/catalog, academy/private, about, team, contact, 
donor-programs (if exists).

═══════════════════════════════════════════════════════════════
REMOVE ALL EURO PRICING ACROSS THE SITE
═══════════════════════════════════════════════════════════════

Search every page for any text containing:
- "€" symbol anywhere
- "FROM €X,XXX" patterns
- "FROM €1,500", "FROM €4,500", "FROM €7,500"
- "FROM €8,500", "FROM €18,000", "FROM €45,000"
- Any numeric price reference

REPLACE all pricing with one of these neutral labels, based 
on context:

For engagement tier cards (audit, briefing, training tiers):
- Replace pricing-side meta with: "REQUEST SCOPE" or 
  "DISCUSS SCOPE" (uppercase eyebrow style)

For donor/EU/program cards:
- Replace with: "REQUEST QUOTE" (uppercase eyebrow style)

For routing/contact cards:
- Remove the pricing line entirely; keep only timeline 
  indicators where they exist (e.g., "1 WEEK", "2-6 WEEKS")

═══════════════════════════════════════════════════════════════
SPECIFIC PAGES AND LOCATIONS
═══════════════════════════════════════════════════════════════

/advisory:
- Section 3 (Three Engagement Types):
  Card 1 (Executive Briefing): remove "FROM €1,500", replace 
  with "REQUEST SCOPE"
  Card 2 (Audit, flagship): remove "FROM €8,500 · REQUEST 
  SCOPE", replace with "REQUEST SCOPE"
  Card 3 (Donor / EU): keep "REQUEST QUOTE"

/audit:
- Section 7 (Audit Tiers):
  Card 1 (Diagnostic): remove "FROM €8,500", replace with 
  "REQUEST SCOPE"
  Card 2 (Standard, flagship): remove "FROM €18,000 · 
  REQUEST SCOPE", replace with "REQUEST SCOPE"
  Card 3 (Strategic): keep "REQUEST QUOTE"

/executive-briefing:
- Section 3 (Formats):
  Card 1 (Standard Briefing): remove "FROM €1,500", replace 
  with "REQUEST SCOPE"
  Card 2 (Leadership Briefing, flagship): remove "FROM 
  €4,500", replace with "REQUEST SCOPE"
  Card 3 (Board Briefing): remove "FROM €7,500", replace 
  with "REQUEST SCOPE"

/contact:
- Section 2 (Routing Cards):
  Card 1 (Executive Briefing): remove "1 WEEK · FROM €1,500", 
  replace with "1 WEEK"
  Card 2 (Audit, flagship): keep "FLAGSHIP · 2-6 WEEKS" 
  unchanged
  Card 3 (Private Team Training): keep "CUSTOM SCOPE" 
  unchanged

ALL OTHER PAGES:
- Search every page for "€" character. Remove any pricing 
  found. Replace with "REQUEST SCOPE" or "DISCUSS SCOPE" 
  as appropriate to context.

═══════════════════════════════════════════════════════════════
PRICING-RELATED FAQ ANSWERS
═══════════════════════════════════════════════════════════════

For any FAQ answer that currently mentions specific euro 
amounts:

/advisory FAQ #1 (currently: "Pricing depends on engagement 
type and scope. Executive Briefings start at €1,500. Audits 
range €8,500-€25,000..."):
Replace with: "Pricing depends on engagement type, scope, 
institutional size, and customization. Every engagement begins 
with a free 30-minute scoping call, after which we provide 
a written proposal with detailed pricing for your specific 
context."

/audit FAQ #1 (if it mentions pricing):
Apply same replacement pattern.

/academy/private FAQ #1 ("How is private training priced?" — 
currently mentions specific ranges):
Replace with: "Pricing depends on format, duration, group 
size, and customization. Every engagement begins with a 
discovery call, after which we provide a written proposal 
with detailed pricing for your specific context."

/executive-briefing FAQ — if any answer mentions specific 
pricing, replace with: "Pricing depends on briefing format, 
group size, and customization. We provide a proposal after 
the initial scoping inquiry."

═══════════════════════════════════════════════════════════════
NON-NEGOTIABLE
═══════════════════════════════════════════════════════════════

- NO € symbol appears anywhere on the site after this change
- NO specific euro figures anywhere
- Replacement labels use only: "REQUEST SCOPE", "DISCUSS 
  SCOPE", "REQUEST QUOTE"
- Timeline indicators ("1 WEEK", "2-6 WEEKS", "12-36 MONTHS") 
  stay where they appear — those are not pricing
- Do NOT modify any other content, copy, or layout
- Do NOT touch hero sections, navigation, footer, or design 
  system tokens

═══════════════════════════════════════════════════════════════
CONFIRMATION
═══════════════════════════════════════════════════════════════

After changes, confirm:
1. Zero "€" characters remain in any HTML file
2. Zero specific euro amounts remain in body text or card meta
3. FAQ answers about pricing redirect to scoping calls 
   without specifics
4. Timeline indicators preserved where present
</pasted_text>

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now verify zero euro symbols remain anywhere:

_[tool: grep]_

_[tool: grep]_

All clean. Let me do a final verification by opening the most-touched page (Advisory) to confirm it still renders:

_[tool: done]_

All pricing removed across the site. 11 specific replacements applied across 6 files:

**Engagement card prices → "Request Scope"**
- `Horizon4 AI - Advisory.html`: 2 cards (€1,500, €8,500)
- `Horizon4 AI - Audit.html`: 2 cards (€8,500, €18,000)
- `Horizon4 AI - Executive Briefing.html`: 3 cards (€1,500, €4,500, €7,500)
- `Horizon4 AI - GovAI.html`: 2 cards (€8,500, €45,000)

**Contact routing card** — `Horizon4 AI - Contact.html`: "1 week · From €1,500" → "1 week" (timeline preserved, price stripped, as specified)

**Pricing-related FAQ answers rewritten:**
- `Horizon4 AI - Advisory.html` FAQ #1 — replaced the long passage with the specified neutral scoping-call answer.
- `Horizon4 AI - Academy Private.html` FAQ #1 — replaced with the specified neutral scoping-call answer.

**Verified:**
- `grep '€'` across the whole project → **zero matches**.
- No `From $`, `EUR `, `euros`, or "priced at $N" patterns anywhere.
- Timeline indicators ("2-6 weeks", "FLAGSHIP · 2-6 WEEKS", "CUSTOM SCOPE", etc.) untouched.
- Advisory page loads with no console errors.

Other touched-card siblings (Donor / EU and Custom Scope ones) already used "Request Quote" / "Request Scope" / "Custom Scope" and didn't need changes. Nothing else (hero copy, nav, footer, tokens, layouts) was modified.

## User

<system-info comment="Only acknowledge these if relevant">
User is viewing file: Horizon4 AI - Course Catalog.html
</system-info>

<pasted_text name="Pasted text (780 lines)">
Build FIVE Solutions pages in sequence within this build:

1. /govai (Government AI)
2. /eduai (Education AI)
3. /businessai (Business AI)
4. /strategyai (Strategy AI)
5. /agentic-ai (Agentic AI — capability layer)

All five inherit the locked design system, header, and footer. 
Do NOT modify any other page.

If the build is too large for a single response, build pages 
ONE AT A TIME in order (1 → 2 → 3 → 4 → 5), confirming each 
before moving to the next. Do not skip any.

═══════════════════════════════════════════════════════════════
GLOBAL RULES — ALL FIVE PAGES
═══════════════════════════════════════════════════════════════

DESIGN TOKENS:
- Page background: bg-base #F0F2F5
- Surface: bg-surface #FFFFFF
- Dark band: bg-deep #0A1F44
- Headings: ink-primary #0A1F44
- Body: ink-body #353E50
- Muted: ink-muted #6B7280
- Primary accent: #0075C9
- Secondary accent: #0D9B84
- Border hairline: #D6DDE8
- Card radius: 4px
- Card padding: 40px desktop / 24px mobile

TYPOGRAPHY: Inter or IBM Plex Sans, locked scale.
LAYOUT: container 1240px, section padding 128/80px.
EYEBROWS: pure uppercase, no em-dashes, no symbols before.
HERO VISUAL RULE: NO sphere on any Solutions page. Full-width 
centered content hero (max 880px, 160px top / 96px bottom 
padding).

PRICING RULE: ZERO euro figures, zero "€" symbols, zero 
specific prices anywhere on any of these 5 pages. Use 
"REQUEST SCOPE", "DISCUSS SCOPE", "REQUEST QUOTE" only.

CONTENT RULES:
- NO "Western Balkan" language
- NO "free class" / "free briefing" language
- NO fabricated stats, testimonials, partner logos, photos
- NO em-dashes
- All CTAs route to exact href targets specified per page

EACH PAGE FOLLOWS THE SAME 10-SECTION STRUCTURE:
1. Hero (centered content, eyebrow + H1 + subhead + 2 CTAs)
2. Why this Horizon (3 cards explaining why this sector needs 
   structured AI)
3. Who we serve (4 audience profiles)
4. What we deliver (6 service offerings)
5. Approach (Diagnose / Design / Train / Embed — same on every 
   page)
6. Frameworks applied (4 frameworks — EU AI Act, ISO 42001, 
   OECD, NIST)
7. Engagement types (3 cards — Focused / Flagship / Multi-year, 
   no prices)
8. FAQ (5 questions)
9. Related Horizons (3 cards linking to the other Solutions 
   pages)
10. Final CTA (dark band, 3 routing links)

═══════════════════════════════════════════════════════════════
PAGE 1 — /govai (HORIZON 01 · GOVERNMENT)
═══════════════════════════════════════════════════════════════

Hero eyebrow: "HORIZON 01 · GOVAI"
Hero H1: "Governed AI for the public sector."
Hero subhead: "AI readiness, governance, and capability 
building for ministries, agencies, and municipalities. 
Designed to survive audit, procurement review, and public 
scrutiny."
Hero CTAs: Primary "Request Audit Scope" → /audit, Secondary 
"Request Executive Briefing" → /executive-briefing

Section 2 (Why GovAI):
Eyebrow "WHY GOVAI" / H2 "Public-sector AI fails differently."
Subhead: "When public institutions deploy AI without 
governance, the failure mode isn't a bad product. It's a 
public accountability event."
3 cards:
  ACCOUNTABILITY / "Decisions need defensible logic." / 
    "Public AI use must be explainable to parliaments, 
    oversight bodies, and citizens. We design for 
    defensibility from day one."
  PROCUREMENT / "AI procurement under EU AI Act scrutiny." / 
    "Vendor selection, conformity assessment, and contractual 
    safeguards aligned with EU AI Act high-risk classification."
  SERVICE DELIVERY / "Citizen-facing AI under public 
    obligation." / "Public services have duty-of-care 
    obligations that private SaaS doesn't. We design workflows 
    that honor them."

Section 3 (Who We Serve) — 4 cards:
  NATIONAL GOVERNMENT / "Ministries and agencies." / 
    "Policy direction, capability programs, governance 
    frameworks, and procurement guidance for line ministries 
    and executive agencies."
  LOCAL GOVERNMENT / "Municipalities and regional bodies." / 
    "Service modernization, public servant training, 
    citizen-facing workflow design, and procurement risk 
    review."
  PUBLIC AGENCIES / "Specialized regulators and authorities." / 
    "Vendor assessment frameworks, technical capacity 
    building, oversight protocol design, and governance 
    operating models."
  INTERNATIONAL & DONOR / "EU-aligned and donor-funded 
    programs." / "Capacity-building program design, M&E 
    frameworks, train-the-trainer curricula, and bilingual 
    local delivery."

Section 4 (What We Deliver) — 6 numbered cards:
  01 AI Readiness Audit — "Six-dimension diagnostic for one 
    ministry, agency, or municipality. Written report with 
    scorecard and 90-day roadmap."
  02 Procurement Governance Review — "Vendor assessment 
    frameworks, AI clauses for public contracts, and 
    conformity assessment protocols."
  03 Public Servant Training — "Role-specific AI capability 
    programs for public servants. Bilingual delivery, 
    certificate completion."
  04 Governance Operating Model — "Institutional AI governance 
    design: policies, oversight committees, human approval 
    workflows, monitoring routines."
  05 Service Redesign with AI — "Citizen-facing service 
    workflow redesign with AI components, human approval 
    points, and accountability protocols."
  06 Donor Program Design — "Multi-year AI capacity-building 
    programs designed for EU and international donor funding 
    frameworks."

Section 5 (Approach) — STANDARD 4 STEPS used across ALL 5 
Solutions pages:
  01 Diagnose — "Six-dimension readiness assessment. Where 
    AI helps, where it must not be allowed."
  02 Design — "Governance framework, use-case portfolio, 
    training plan, 90-day roadmap."
  03 Train — "Role-specific cohorts and workshops with real 
    deliverables. Bilingual."
  04 Embed — "Pilot, measure, refresh. Human-approved 
    workflows and monitoring routines."

Section 6 (Frameworks) — STANDARD 4 CARDS used across ALL 
5 pages:
  REGULATION / EU AI Act / "Risk classification, high-risk 
    system obligations, transparency requirements, conformity 
    assessment." / "Phasing 2025-2027"
  MANAGEMENT SYSTEM / ISO/IEC 42001 / "AI management system: 
    governance, risk, lifecycle, continuous improvement." / 
    "Published 2023"
  PRINCIPLES / OECD AI Principles / "Trustworthy AI: 
    inclusivity, transparency, accountability, safety, 
    human-centered values." / "46+ countries"
  RISK FRAMEWORK / NIST AI RMF / "Risk management framework 
    with Generative AI Profile. Practical, voluntary, widely 
    adopted." / "v1.0, 2023"

Section 7 (Engagement Types) — 3 cards, NO prices:
  Card 1 FOCUSED / "Single-Ministry Audit" / "2-4 weeks" / 
    Body: "Readiness assessment for one ministry or agency. 
    Scorecard, risk register, and 90-day roadmap." / List: 
    Six-dimension assessment, Use-case prioritization, 
    Governance gap review, Roadmap with named owners / Meta: 
    "REQUEST SCOPE" / CTA "Request Scope →" → /audit
  
  Card 2 FLAGSHIP (accent bar on top) / "FLAGSHIP · 
    INSTITUTIONAL" / "Full Institutional Program" / "3-6 
    months" / Body: "Audit + governance framework + training 
    + 90-day embedded support. Most common public-sector 
    engagement." / List: Institutional readiness audit, 
    Custom governance operating model, Public servant 
    capability program, Embedded oversight and monitoring / 
    Meta: "REQUEST SCOPE" / CTA "Request Scope →" → /audit
  
  Card 3 MULTI-YEAR / "Donor / EU Program" / "12-36 months" / 
    Body: "Multi-year capacity-building program designed for 
    EU or donor funding frameworks. National-scale capability 
    building." / List: Multi-cohort training programs, 
    Train-the-trainer curricula, M&E framework with baseline 
    study, Bilingual delivery infrastructure / Meta: "REQUEST 
    QUOTE" / CTA "Discuss Program →" → /donor-programs

Section 8 (FAQ) — 5 questions:
  1. Do you only work in Albania? "Horizon4 is headquartered 
    in Tirana. Our cofounders' institutional network extends 
    to the EU and beyond. We serve regional and international 
    clients with in-person and remote delivery."
  2. Can GovAI engagements be donor-funded? "Yes. We have 
    experience designing capacity-building programs for donor 
    and EU-aligned frameworks. GovAI scope can be incorporated 
    into larger program budgets."
  3. Do you support EU AI Act compliance? "We prepare 
    institutions to engage with EU AI Act requirements through 
    readiness diagnostics, governance design, and capability 
    building. Formal certification is conducted by accredited 
    certification bodies. We support readiness; we do not 
    certify compliance."
  4. Can you work in Albanian? "Yes. All work is delivered 
    in Albanian, English, or bilingual format. Materials are 
    produced bilingually for institutional circulation."
  5. Who delivers GovAI engagements? "Horizon4 leadership 
    conducts every engagement directly. GovAI is typically 
    led by Mario Keputa (Cornell MPA, World Bank and OSCE 
    experience) with cofounders engaged based on scope."

Section 9 (Related Horizons) — 3 cards:
  HORIZON 02 / EduAI / "Faculty readiness, academic integrity, 
    university governance." / "Explore EduAI →" → /eduai
  HORIZON 03 / BusinessAI / "Productivity, prompt systems, 
    and workflow training for SMEs." / "Explore BusinessAI →" 
    → /businessai
  HORIZON 04 / StrategyAI / "Roadmaps, governance operating 
    models, and donor program design." / "Explore StrategyAI 
    →" → /strategyai

Section 10 (Final CTA, bg-deep): Eyebrow "START" / H2 white 
"AI capability for the public sector." / Subhead light gray 
"Start with an audit, a briefing, or a direct conversation 
about your institution." / 3 white text links: "Request Audit 
Scope" → /audit · "Request Briefing" → /executive-briefing · 
"General Inquiry" → /contact

═══════════════════════════════════════════════════════════════
PAGE 2 — /eduai (HORIZON 02 · EDUCATION)
═══════════════════════════════════════════════════════════════

Hero eyebrow: "HORIZON 02 · EDUAI"
Hero H1: "AI for serious educational institutions."
Hero subhead: "Faculty readiness, academic integrity, and 
university governance for the AI era. Built for institutions 
preparing graduates and protecting credentials."
Hero CTAs: same primary/secondary as GovAI

Section 2 (Why EduAI):
Eyebrow "WHY EDUAI" / H2 "Education's AI moment is 
different."
Subhead: "Universities and schools face a unique AI challenge: 
they must teach students to use AI responsibly while protecting 
the integrity of their credentials."
3 cards:
  ACADEMIC INTEGRITY / "Credentials need defensible policy." / 
    "Without explicit AI policy, every graded assessment 
    becomes contestable. We design policy frameworks faculty 
    and students can both work within."
  FACULTY READINESS / "Teaching AI requires using AI." / 
    "Faculty cannot teach responsible AI use without 
    practical capability themselves. We build that capability 
    institutionally."
  GOVERNANCE / "Institutional AI strategy is now mandatory." / 
    "EU AI Act treats educational AI applications as high-
    risk. Universities need governance frameworks that survive 
    accreditation scrutiny."

Section 3 (Who We Serve) — 4 cards:
  UNIVERSITIES / "Public and private universities." / 
    "Faculty programs, academic integrity policy, AI 
    governance frameworks, and curriculum redesign for AI 
    integration."
  SECONDARY SCHOOLS / "High schools and secondary education." / 
    "Teacher training, classroom AI integration, parent and 
    student communication frameworks, assessment redesign."
  EDUCATION MINISTRIES / "National and regional education 
    authorities." / "Policy guidance, system-wide capability 
    programs, framework design for sector-wide AI integration."
  EDU-TECH PROVIDERS / "EdTech companies and platforms." / 
    "Governance reviews, EU AI Act high-risk classification 
    support, conformity assessment readiness."

Section 4 (What We Deliver) — 6 numbered cards:
  01 Faculty AI Readiness Program — "Multi-week capability 
    program for faculty. Practical AI use, classroom 
    integration, and responsible AI fundamentals."
  02 Academic Integrity Policy Design — "Written policy 
    frameworks for student AI use, disclosure requirements, 
    and assessment design adapted for the AI era."
  03 Institutional AI Governance — "University-level AI 
    governance: oversight committees, faculty senate 
    integration, and student protections."
  04 Curriculum Redesign Support — "Course-level AI 
    integration: where AI helps learning, where it must be 
    restricted, and assessment alternatives."
  05 Student AI Capability Programs — "Student-facing AI 
    literacy programs aligned with academic integrity 
    requirements."
  06 EdTech Governance Review — "Vendor assessment frameworks, 
    EU AI Act readiness, and conformity assessment support 
    for educational AI providers."

Section 5 (Approach): SAME 4 STEPS as GovAI

Section 6 (Frameworks): SAME 4 CARDS as GovAI

Section 7 (Engagement Types) — 3 cards, NO prices:
  Card 1 FOCUSED / "Faculty Readiness Program" / "1-3 months" 
    / Body: "Focused capability program for one faculty cohort 
    or department. Practical AI use plus academic integrity 
    fundamentals." / List: Multi-session live training, 
    Bilingual workbook materials, Departmental policy 
    template, Completion certificates / Meta: "REQUEST SCOPE" 
    / CTA "Request Scope →" → /audit
  
  Card 2 FLAGSHIP / "FLAGSHIP · INSTITUTIONAL" / "Full 
    University Program" / "6-12 months" / Body: "Institutional 
    AI governance, faculty capability, academic integrity 
    policy, and curriculum support. Most common university 
    engagement." / List: Institutional AI readiness audit, 
    Custom academic integrity policy, Full faculty capability 
    program, Curriculum redesign support / Meta: "REQUEST 
    SCOPE" / CTA "Request Scope →" → /audit
  
  Card 3 MULTI-YEAR / "Education Sector Program" / "12-36 
    months" / Body: "Multi-institution program for education 
    ministries or donor-funded education capability 
    initiatives." / List: Sector-wide readiness study, 
    Train-the-trainer programs, M&E framework, Multi-site 
    bilingual delivery / Meta: "REQUEST QUOTE" / CTA "Discuss 
    Program →" → /donor-programs

Section 8 (FAQ):
  1. Do you support EU AI Act compliance for educational AI? 
    "EU AI Act treats certain educational AI uses as high-
    risk. We help institutions prepare for these requirements 
    through readiness work and governance design. We don't 
    certify compliance — certification is conducted by 
    accredited bodies."
  2. Can you adapt academic integrity policy for our 
    institution? "Yes. Every policy engagement begins with 
    understanding your accreditation context, faculty 
    culture, and student population. Templates are starting 
    points, not finished products."
  3. Do you work with private and public universities? "Yes. 
    Both have AI capability needs. Private institutions often 
    face faster competitive pressure; public institutions 
    often face more regulatory scrutiny. Both deserve serious 
    work."
  4. Can faculty training be delivered in Albanian? "Yes. All 
    EduAI programs are delivered in Albanian, English, or 
    bilingual format. Bilingual is the most common request 
    for institutional clients."
  5. Who delivers EduAI engagements? "EduAI engagements are 
    typically led by Indri Dyrmishi (University of Minnesota 
    Carlson MBA, former University of Tirana Tech Transfer 
    Office director, former Senior Instructor at AUM) with 
    cofounders engaged based on scope."

Section 9 (Related Horizons) — 3 cards linking to GovAI, 
BusinessAI, StrategyAI (NOT EduAI since that's this page)

Section 10 (Final CTA): same pattern as GovAI but H2 
"AI capability for educational institutions."

═══════════════════════════════════════════════════════════════
PAGE 3 — /businessai (HORIZON 03 · BUSINESS)
═══════════════════════════════════════════════════════════════

Hero eyebrow: "HORIZON 03 · BUSINESSAI"
Hero H1: "AI productivity for serious businesses."
Hero subhead: "Workflow redesign, prompt systems, and team 
capability building for SMEs, professional services, and 
operating businesses. Practical productivity, governed 
properly."
Hero CTAs: Primary "Request Scope" → /audit, Secondary 
"Request Briefing" → /executive-briefing

Section 2 (Why BusinessAI):
Eyebrow "WHY BUSINESSAI" / H2 "Business AI fails by going 
generic."
Subhead: "Most business AI initiatives stall because they're 
deployed without role context, workflow design, or governance. 
Tool licenses are not capability."
3 cards:
  ROLE-SPECIFIC / "Productivity is role-specific." / "AI 
    helps a sales lead, a finance manager, and a project lead 
    in completely different ways. Generic training misses all 
    three."
  WORKFLOW DESIGN / "Tools alone don't create capability." / 
    "Capability comes from redesigned workflows where AI 
    handles the right tasks at the right approval points. 
    That requires intentional design."
  GOVERNANCE / "Business AI under regulatory scrutiny." / 
    "Confidentiality, client data, and IP protection are not 
    optional. We design AI workflows that respect them by 
    default."

Section 3 (Who We Serve) — 4 cards:
  SMES / "Small and medium enterprises." / "Workflow 
    redesign, prompt systems, role-specific training, and 
    AI productivity playbooks tailored to operating 
    businesses."
  PROFESSIONAL SERVICES / "Law firms, consultancies, 
    accountants." / "AI for research, drafting, and client 
    work with confidentiality and IP protection built into 
    workflow design."
  OPERATING TEAMS / "Sales, marketing, finance, ops." / 
    "Function-specific capability programs: sales workflows, 
    marketing systems, financial analysis, operational 
    excellence."
  EXECUTIVE LEADERSHIP / "C-suite and senior management." / 
    "Strategic AI alignment, executive capability briefings, 
    and governance operating model design."

Section 4 (What We Deliver) — 6 numbered cards:
  01 AI Productivity Audit — "Workflow assessment for one 
    business unit. Where AI helps, where it doesn't, and 
    governance gaps."
  02 Prompt System Design — "Custom prompt libraries and 
    systems for role-specific use cases, designed for 
    repeatable, defensible outputs."
  03 Team Capability Programs — "Role-specific AI training 
    cohorts. Half-day to multi-week formats, with workbook 
    and final deliverable."
  04 Workflow Redesign — "Function-level workflow redesign 
    integrating AI with human approval points and quality 
    controls."
  05 Confidentiality & IP Governance — "AI use policy 
    frameworks for confidential client work, intellectual 
    property protection, and regulatory compliance."
  06 Executive AI Briefings — "Leadership-level briefings on 
    AI strategy, governance, and capability building 
    decisions."

Section 5 (Approach): SAME 4 STEPS

Section 6 (Frameworks): SAME 4 CARDS

Section 7 (Engagement Types) — 3 cards, NO prices:
  Card 1 FOCUSED / "Team Productivity Sprint" / "4-8 weeks" 
    / Body: "Focused AI productivity program for one team or 
    function. Workflow redesign and capability training." / 
    List: Function-level assessment, Custom prompt library, 
    Team workshop series, Productivity playbook / Meta: 
    "REQUEST SCOPE" / CTA "Request Scope →" → /audit
  
  Card 2 FLAGSHIP / "FLAGSHIP · INSTITUTIONAL" / "Full Business 
    Program" / "3-6 months" / Body: "Multi-team AI capability 
    program with governance foundation. Most common business 
    engagement." / List: Business AI readiness audit, 
    Custom governance and IP policy, Multi-team capability 
    cohorts, Embedded workflow support / Meta: "REQUEST SCOPE" 
    / CTA "Request Scope →" → /audit
  
  Card 3 MULTI-YEAR / "Sector / Donor Program" / "12-24 
    months" / Body: "Multi-business or sector-wide AI 
    capability program. Often donor-funded for SME 
    development." / List: Sector readiness study, 
    Train-the-trainer infrastructure, Multi-cohort delivery, 
    M&E framework / Meta: "REQUEST QUOTE" / CTA "Discuss 
    Program →" → /donor-programs

Section 8 (FAQ):
  1. Are AI training programs really worth it for SMEs? "When 
    designed around real workflows, yes. Generic training 
    rarely is. The question isn't whether to train — it's 
    whether to design training around your actual operating 
    context. We do the latter."
  2. Can you sign NDAs for confidential engagements? "Yes. 
    BusinessAI engagements routinely involve confidential 
    information. We sign NDAs and operate under standard 
    professional confidentiality."
  3. Do you work with sole proprietors and freelancers? "Our 
    BusinessAI work is designed for teams of 5+ where 
    workflow design and capability programs create real 
    leverage. Individuals are better served by our public 
    Academy courses."
  4. Can BusinessAI engagements be delivered remotely? "Yes. 
    On-site, fully remote, and hybrid formats are all 
    available. Remote works particularly well for 
    multi-location teams."
  5. Who delivers BusinessAI engagements? "BusinessAI 
    engagements are typically led by Yllka Sela (Brandeis 
    STEM MBA, 8 years at GIZ, former Economic Policy lecturer) 
    with cofounders engaged based on scope."

Section 9 (Related Horizons): GovAI, EduAI, StrategyAI

Section 10 (Final CTA): H2 "AI capability for serious 
businesses."

═══════════════════════════════════════════════════════════════
PAGE 4 — /strategyai (HORIZON 04 · STRATEGY)
═══════════════════════════════════════════════════════════════

Hero eyebrow: "HORIZON 04 · STRATEGYAI"
Hero H1: "AI strategy that survives implementation."
Hero subhead: "Roadmaps, governance operating models, and 
program design for institutions making multi-year AI 
commitments. Strategic clarity, governance discipline."
Hero CTAs: same as GovAI

Section 2 (Why StrategyAI):
Eyebrow "WHY STRATEGYAI" / H2 "AI strategy fails by being 
abstract."
Subhead: "Most AI strategy documents become shelfware because 
they're written for board presentations, not implementation. 
StrategyAI work is written to be executed."
3 cards:
  IMPLEMENTABLE / "Strategy with named owners." / "Every 
    strategic document we produce has accountability lines, 
    dependency maps, and 90-day execution sequencing built 
    in."
  GOVERNANCE-INTEGRATED / "Strategy and governance, designed 
    together." / "We design AI strategy and AI governance as 
    one continuous artifact. Strategy without governance is 
    risk; governance without strategy is paperwork."
  MULTI-YEAR / "Built for institutional time horizons." / 
    "Government and donor work runs in 12-36 month cycles. 
    StrategyAI is designed for these horizons, not quarterly 
    sprints."

Section 3 (Who We Serve) — 4 cards:
  GOVERNMENT EXECUTIVES / "Ministers, deputy ministers, 
    chiefs of staff." / "National-level AI strategy, 
    cross-ministerial coordination, and donor program 
    alignment."
  INSTITUTIONAL LEADERSHIP / "University presidents, agency 
    directors, board chairs." / "Multi-year institutional AI 
    transformation strategy with executable program design."
  DONOR ORGANIZATIONS / "EU delegations, World Bank, UN, GIZ, 
    USAID." / "AI capability program design, M&E frameworks, 
    and delivery infrastructure for institutional capacity 
    building."
  CORPORATE BOARDS / "Public and private sector boards." / 
    "Board-level AI strategy briefings, multi-year capability 
    roadmaps, and governance operating model design."

Section 4 (What We Deliver) — 6 numbered cards:
  01 Multi-Year AI Strategy — "12-36 month AI capability 
    strategy with named workstreams, accountability lines, 
    and milestone planning."
  02 Governance Operating Model — "Institutional AI 
    governance design: oversight bodies, decision authority, 
    escalation paths, monitoring routines."
  03 Donor Program Design — "EU and international donor 
    program proposals: theory of change, M&E framework, 
    delivery architecture, sustainability plan."
  04 Cross-Institutional Coordination — "Multi-ministry or 
    multi-institution AI coordination frameworks for 
    national-level capability building."
  05 Strategic Roadmap Refresh — "Annual or biennial review 
    and refresh of existing AI strategies with implementation 
    learning integrated."
  06 Executive & Board Briefings — "Strategic AI briefings 
    for executives and boards preparing major capability 
    commitments."

Section 5 (Approach): SAME 4 STEPS

Section 6 (Frameworks): SAME 4 CARDS

Section 7 (Engagement Types) — 3 cards, NO prices:
  Card 1 FOCUSED / "Strategic AI Roadmap" / "2-3 months" / 
    Body: "Written multi-year AI strategy for one institution 
    or program. Implementation-ready, governance-integrated." 
    / List: Strategic readiness assessment, Multi-year 
    roadmap with milestones, Governance operating model, 
    Implementation handoff / Meta: "REQUEST SCOPE" / CTA 
    "Request Scope →" → /audit
  
  Card 2 FLAGSHIP / "FLAGSHIP · STRATEGIC" / "Institutional 
    Transformation" / "6-18 months" / Body: "Multi-year AI 
    transformation engagement with strategy, governance, 
    program design, and execution support." / List: Full 
    strategic engagement, Custom governance model, Donor 
    program design (if relevant), Quarterly review and 
    refresh / Meta: "REQUEST SCOPE" / CTA "Request Scope →" 
    → /audit
  
  Card 3 MULTI-YEAR / "Donor / EU Program" / "12-36 months" / 
    Body: "Full multi-year program design and oversight for 
    EU or international donor frameworks." / List: Program 
    design with theory of change, M&E framework, Delivery 
    infrastructure design, Multi-year oversight handoff / 
    Meta: "REQUEST QUOTE" / CTA "Discuss Program →" → 
    /donor-programs

Section 8 (FAQ):
  1. Is this management consulting? "It's adjacent but 
    different. Traditional management consulting writes 
    strategy as a deliverable. StrategyAI writes strategy 
    as an executable system, with governance and capability 
    components built in. The unit of work is the system, 
    not the deck."
  2. Do you work with donor and EU funding? "Yes. Multiple 
    cofounders have institutional experience with World 
    Bank, GIZ, OSCE, UNDP, and EU-funded programs. 
    StrategyAI engagements are frequently incorporated into 
    larger donor program frameworks."
  3. How is this different from your Advisory Audit work? 
    "Audits are diagnostic. StrategyAI is prescriptive. An 
    audit tells you where you are. A StrategyAI engagement 
    tells you where you're going and how, with named 
    accountability and execution discipline. Audits often 
    precede StrategyAI engagements."
  4. Who delivers StrategyAI engagements? "StrategyAI is led 
    by Mario Keputa (Cornell MPA, World Bank, OSCE, EDYN 
    network) with full cofounder team engaged for multi-year 
    programs."
  5. Can StrategyAI work span multiple countries? "Yes. 
    Cofounder networks include institutional contacts across 
    the Western Balkans, EU, and donor community. Regional 
    and multi-country engagements are scoped accordingly."

Section 9 (Related Horizons): GovAI, EduAI, BusinessAI

Section 10 (Final CTA): H2 "AI strategy with execution 
discipline."

═══════════════════════════════════════════════════════════════
PAGE 5 — /agentic-ai (AGENTIC AI · CAPABILITY LAYER)
═══════════════════════════════════════════════════════════════

NOTE: Agentic AI is presented differently from the 4 sector 
horizons. It's a CAPABILITY LAYER that cuts across all four. 
Hero eyebrow reflects this distinction.

Hero eyebrow: "CAPABILITY LAYER · AGENTIC AI"
Hero H1: "Agentic AI under institutional control."
Hero subhead: "Agentic AI capability across government, 
education, business, and strategy. Designed with human 
approval, governance, and accountability at every decision 
point."
Hero CTAs: same as GovAI

Section 2 (Why Agentic AI Now):
Eyebrow "WHY AGENTIC AI NOW" / H2 "Agentic AI requires 
governance, not enthusiasm."
Subhead: "The shift from AI assistants to AI agents is real 
and accelerating. Most institutional adopters are not ready. 
We help them get ready."
3 cards:
  AUTONOMY UNDER OVERSIGHT / "Agents act. Humans approve." / 
    "Agentic systems take actions, not just produce outputs. 
    Every action requires explicit human approval points and 
    accountability assignment."
  EMERGENT FAILURE MODES / "Agent failures look different." / 
    "Agentic AI fails in ways traditional software doesn't. 
    Our governance work specifically addresses agentic 
    failure modes: drift, scope creep, unintended 
    consequences."
  HIGH-STAKES READY / "Built for institutional risk 
    tolerance." / "Agentic deployment in regulated 
    environments requires audit trails, human override, and 
    failure containment. We design for these from day one."

Section 3 (Who We Serve) — 4 cards:
  GOVERNMENT AGENCIES / "Public-sector agentic deployment." / 
    "Citizen-facing service workflows, internal operational 
    agents, and regulatory-grade governance frameworks."
  UNIVERSITIES / "Educational agentic capability." / 
    "Student-facing AI agents under academic integrity 
    frameworks, faculty agent workflows, institutional 
    governance."
  ENTERPRISES & SMES / "Operational agentic deployment." / 
    "Workflow automation, customer service agents, internal 
    operational agents with confidentiality and IP 
    protection."
  TECHNICAL LEADERSHIP / "CTOs and engineering directors." / 
    "Technical governance frameworks, agentic architecture 
    review, and integration with existing institutional 
    systems."

Section 4 (What We Deliver) — 6 numbered cards:
  01 Agentic AI Discovery Workshop — "Half-day to one-day 
    workshop. What agentic AI is, what it isn't, and where 
    it fits in your institution."
  02 Agentic Readiness Assessment — "Institutional readiness 
    for agentic deployment: governance, technical 
    infrastructure, oversight capacity."
  03 Agentic Governance Framework — "Custom governance 
    framework for agentic AI: approval workflows, oversight 
    bodies, failure containment, audit trails."
  04 Agentic Workflow Design — "Design and prototyping of 
    specific agentic workflows with human approval points and 
    rollback mechanisms."
  05 Technical Architecture Review — "Review of agentic 
    systems against institutional risk tolerance, including 
    integration architecture and security review."
  06 Agentic Capability Programs — "Multi-cohort capability 
    programs for teams deploying or overseeing agentic 
    systems."

Section 5 (Approach): SAME 4 STEPS

Section 6 (Frameworks): SAME 4 CARDS, but reorder: NIST AI 
RMF first (most relevant to agentic), then EU AI Act, ISO 
42001, OECD.

Section 7 (Engagement Types) — 3 cards, NO prices:
  Card 1 FOCUSED / "Agentic Discovery & Readiness" / "4-6 
    weeks" / Body: "Half-day workshop plus written readiness 
    assessment for one institution. The most common entry 
    point for agentic adoption." / List: Discovery workshop, 
    Readiness scorecard, Initial use-case shortlist, 
    Governance gap review / Meta: "REQUEST SCOPE" / CTA 
    "Request Scope →" → /audit
  
  Card 2 FLAGSHIP / "FLAGSHIP · AGENTIC PROGRAM" / "Full 
    Agentic Deployment Support" / "3-9 months" / Body: 
    "Discovery, readiness, governance framework, workflow 
    design, and embedded support through first agentic 
    deployment. Most common agentic engagement." / List: 
    Discovery and readiness, Custom agentic governance, 
    Workflow prototyping, Embedded deployment oversight / 
    Meta: "REQUEST SCOPE" / CTA "Request Scope →" → /audit
  
  Card 3 MULTI-YEAR / "Strategic Agentic Capability" / 
    "12-24 months" / Body: "Multi-year agentic capability 
    development for institutions or donor programs adopting 
    agentic at scale." / List: Strategic agentic roadmap, 
    Multi-system governance architecture, Multi-cohort 
    capability programs, Quarterly review and refresh / 
    Meta: "REQUEST QUOTE" / CTA "Discuss Program →" → 
    /donor-programs

Section 8 (FAQ):
  1. Is agentic AI ready for institutional use? "Some 
    agentic systems are mature enough for low-stakes 
    institutional deployment today, under proper governance. 
    Higher-stakes use cases require careful readiness work. 
    We help institutions calibrate that decision."
  2. What's the difference between Agentic AI and the four 
    sector Horizons? "The four Horizons (GovAI, EduAI, 
    BusinessAI, StrategyAI) are sector-specific. Agentic AI 
    is a capability layer that cuts across all four. A 
    ministry might deploy agentic AI under GovAI; a 
    university under EduAI."
  3. Do you build agentic systems for clients? "We design 
    governance, workflows, and integration architecture for 
    agentic systems. Technical build is typically done by 
    vetted technical partners with named accountability, 
    under our governance framework."
  4. Can you assess existing agentic deployments? "Yes. 
    Agentic AI Discovery and Readiness work can include 
    review of existing or planned agentic deployments 
    against institutional risk tolerance."
  5. Who delivers Agentic AI engagements? "Agentic AI work 
    is led by Fregis Sala (USC MS Electrical & Computer 
    Engineering, NVIDIA, former Albanian public service 
    advisor) with full cofounder team engaged for 
    institutional or multi-year programs."

Section 9 (Related Horizons) — 4 cards (NOT 3 — this page 
shows all four sectors since Agentic AI cuts across them):
  HORIZON 01 / GovAI / "Government AI." / → /govai
  HORIZON 02 / EduAI / "Education AI." / → /eduai
  HORIZON 03 / BusinessAI / "Business AI." / → /businessai
  HORIZON 04 / StrategyAI / "Strategy AI." / → /strategyai

Section 10 (Final CTA): H2 "Agentic AI, under institutional 
control."

═══════════════════════════════════════════════════════════════
FINAL CONFIRMATION
═══════════════════════════════════════════════════════════════

After building all 5 pages, confirm:
1. All 5 pages inherit existing header and footer
2. NONE of the 5 pages have a sphere in hero (full-width 
   content)
3. ZERO euro figures, ZERO "€" symbols anywhere on these pages
4. Each page has its hero eyebrow correctly: HORIZON 01 · 
   GOVAI, HORIZON 02 · EDUAI, HORIZON 03 · BUSINESSAI, 
   HORIZON 04 · STRATEGYAI, CAPABILITY LAYER · AGENTIC AI
5. Each page has 10 sections following the standard structure
6. Engagement Type middle cards (Section 7) have accent bar 
   for flagship
7. Approach steps (Section 5) and Frameworks (Section 6) are 
   IDENTICAL across all 5 pages
8. /agentic-ai Section 9 has 4 related cards (not 3)
9. FAQ #3 on /govai reads: "We support readiness; we do not 
   certify compliance."
10. No em-dashes, no Western Balkan, no fabricated stats or 
    photos
11. Each named cofounder appears as engagement lead on the 
    matching sector page
</pasted_text>

## Assistant

_[tool: str_replace_edit]_

I'll build these one at a time per your instruction. **Page 1 (GovAI)** already exists from an earlier turn — let me first update it to match the new spec exactly (a few FAQ rewordings and the "Western Balkans" removal), then build **Page 2 (EduAI)** in this same turn.

_[tool: copy_files]_

_[tool: run_script]_

_[tool: done]_

_[tool: eval_js]_

**Pages 1 and 2 complete.** Stopping here per your "one at a time, confirming each" instruction, since pushing all five into one turn risks context exhaustion.

**Page 1 — `/govai`** updated to match new spec:
- FAQ #1 rewritten (Tirana + EU + beyond, no Western Balkans)
- FAQ #2 shortened to spec's "Can GovAI engagements be donor-funded?"
- FAQ #4 generalized ("All work…" instead of "All GovAI work…")
- FAQ #5 cofounder credit updated to "Cornell MPA, World Bank and OSCE experience"
- Flagship card body now uses plus signs per spec: "Audit + governance framework + training + 90-day embedded support."
- All other sections, layout, and pricing-removal already matched spec.

**Page 2 — `/eduai`** built fresh from GovAI template:
- Hero: "Horizon 02 · EduAI" eyebrow, "AI for serious educational institutions.", correct subhead, same CTAs
- 6 EduAI-specific icons (Book, Chalkboard, Government, University, School, Laptop) replacing the GovAI set
- Why EduAI: Academic Integrity / Faculty Readiness / Governance
- Who We Serve: Universities / Secondary Schools / Education Ministries / EdTech Providers
- 6 offerings: Faculty AI Readiness Program → EdTech Governance Review
- Approach (Diagnose/Design/Train/Embed) and Frameworks (EU AI Act / ISO 42001 / OECD / NIST) — identical to GovAI per spec
- Engagement cards: Faculty Readiness Program / Full University Program (flagship) / Education Sector Program
- 5 FAQ entries with the spec's exact wording; em-dash replaced with period in FAQ #1 ("We don't certify compliance. Certification is conducted by accredited bodies.")
- Related Horizons: GovAI, BusinessAI, StrategyAI (no self-link)
- Final CTA: "AI capability for educational institutions."

**Verified:** 10 sections present, 7 icon cards (3+4), 6 offerings, 4 frameworks, 3 engagement cards (1 flagship), 5 FAQ, 3 related cards linking `/govai`, `/businessai`, `/strategyai`. Zero euro symbols. No horizontal overflow. No console errors.

Say "continue" or "build page 3" and I'll do `/businessai` next, then `/strategyai`, then `/agentic-ai`.

## User

continue

## Assistant

_[tool: snip]_

Building **Page 3 — `/businessai`** as a copy of GovAI with targeted content swaps.

_[tool: copy_files]_

_[tool: run_script]_

_[tool: done]_

_[tool: eval_js]_

_[tool: copy_files]_

Building **Page 4 — `/strategyai`**.

_[tool: run_script]_

_[tool: done]_

_[tool: eval_js]_

_[tool: copy_files]_

Building **Page 5 — `/agentic-ai`** (capability layer, special structure with 4 related cards and reordered frameworks).

_[tool: run_script]_

_[tool: done]_

_[tool: eval_js]_

All five Solutions pages are built and verified.

**Final acceptance verified for Page 5 (Agentic AI):**
- Hero eyebrow: `Capability Layer · Agentic AI` (not "Horizon NN")
- 10 sections, 7 icon cards, 6 offerings, 4 frameworks, 3 engagement (1 flagship), 5 FAQ, **4 related cards** (not 3 — special per spec)
- Frameworks reordered as specified: **NIST AI RMF → EU AI Act → ISO/IEC 42001 → OECD AI Principles**
- Related links: `/govai`, `/eduai`, `/businessai`, `/strategyai`
- Zero euro symbols

**Summary of the full 5-page build:**

| # | File | Hero eyebrow | Lead cofounder in FAQ #5 |
|---|---|---|---|
| 1 | `Horizon4 AI - GovAI.html` | Horizon 01 · GovAI | Mario Keputa |
| 2 | `Horizon4 AI - EduAI.html` | Horizon 02 · EduAI | Indri Dyrmishi |
| 3 | `Horizon4 AI - BusinessAI.html` | Horizon 03 · BusinessAI | Yllka Sela |
| 4 | `Horizon4 AI - StrategyAI.html` | Horizon 04 · StrategyAI | Mario Keputa |
| 5 | `Horizon4 AI - Agentic AI.html` | Capability Layer · Agentic AI | Fregis Sala |

**Verified across all five pages:**
- All inherit the existing Nav (with mega-menu) and Footer
- No sphere in any hero — full-width centered content (`.gov-hero` pattern, max 880px, 160px/96px padding)
- Zero `€` symbols, zero specific euro figures (all engagement card meta uses `Request Scope` / `Request Quote`)
- Approach (Diagnose / Design / Train / Embed) and the 4 standard Frameworks copy is identical across pages 1–4; Agentic AI uses the same four frameworks but reordered with NIST first
- Engagement middle card has the flagship treatment (2px accent-primary top bar, blue tag, soft shadow)
- GovAI FAQ #3 ends with the exact required line: *"We support readiness; we do not certify compliance."*
- No em-dashes, no "Western Balkan" phrasing, no fabricated stats, testimonials, partners, or photos

Each named cofounder appears as the lead on the matching page (GovAI ↔ Mario, EduAI ↔ Indri, BusinessAI ↔ Yllka, StrategyAI ↔ Mario, Agentic AI ↔ Fregis).

No other pages were modified.

## User

<system-info comment="Only acknowledge these if relevant">
User is viewing file: Horizon4 AI - BusinessAI.html
</system-info>

<pasted_text name="Pasted text (379 lines)">
Build /donor-programs. Single page. Inherit existing header, 
footer, design system. Do NOT modify any other page.

═══════════════════════════════════════════════════════════════
GLOBAL RULES (REMINDER)
═══════════════════════════════════════════════════════════════

DESIGN TOKENS:
- Page background: bg-base #F0F2F5
- Surface/card: bg-surface #FFFFFF
- Dark band: bg-deep #0A1F44
- Headings: ink-primary #0A1F44
- Body: ink-body #353E50
- Muted: ink-muted #6B7280
- Primary accent: #0075C9
- Secondary accent: #0D9B84
- Border hairline: #D6DDE8
- Card radius: 4px

TYPOGRAPHY: Inter or IBM Plex Sans, locked scale.
LAYOUT: container 1240px, section padding 128/80px.
EYEBROWS: pure uppercase, no em-dashes, no symbols before.
HERO VISUAL RULE: NO sphere. Full-width content only.

PRICING RULE: ZERO euro figures, zero "€" symbols. Use 
"REQUEST QUOTE" or "DISCUSS SCOPE" only.

═══════════════════════════════════════════════════════════════
PAGE STRUCTURE — /donor-programs (9 SECTIONS)
═══════════════════════════════════════════════════════════════

═══ SECTION 1 — HERO (bg-base, full-width content) ═══

Single full-width centered content column, max-width 880px.
160px top, 96px bottom padding.

Eyebrow (centered, accent-primary): "ADVISORY · DONOR & EU 
PROGRAMS"

H1 (centered): "AI capacity programs for donor-funded and EU-
aligned work."

Subhead (centered, Body XL, max 60ch):
"Multi-year AI capability programs designed for EU AI Act 
alignment, donor M&E frameworks, and institutional 
sustainability."

CTAs (centered):
  Primary: "Discuss a Program"   → #form
  Secondary: "Request Briefing"  → /executive-briefing

═══ SECTION 2 — WHAT WE DESIGN (bg-surface) ═══

Eyebrow: "WHAT WE DESIGN"
H2: "Three program archetypes."
Subhead (max 60ch): "Donor-funded AI capability programs 
typically fall into three structures. We design proposals, 
deliver implementation, and report against M&E frameworks 
for all three."

3-card grid, 24px gap:

CARD 1:
  Number (large, ink-muted, weight 600): "01"
  Eyebrow: "INSTITUTIONAL CAPABILITY"
  H4: "Single-institution programs."
  Body: "Multi-year AI readiness, governance, and capability 
        building for one ministry, university, or agency. 
        Typically 12-24 months."

CARD 2:
  Number: "02"
  Eyebrow: "SECTOR-WIDE"
  H4: "Multi-institution programs."
  Body: "National or regional AI capability programs across 
        multiple institutions in the same sector (e.g., 
        national university system, all line ministries). 
        Typically 18-36 months."

CARD 3:
  Number: "03"
  Eyebrow: "TRAIN-THE-TRAINER"
  H4: "Capability infrastructure programs."
  Body: "Building local AI capability delivery infrastructure: 
        certified instructor cohorts, curriculum 
        infrastructure, and self-sustaining training systems. 
        Typically 24-36 months."

═══ SECTION 3 — WHO WE WORK WITH (bg-base) ═══

Eyebrow: "WHO WE WORK WITH"
H2: "Donor agencies, EU programs, and implementing 
institutions."
Subhead (max 60ch): "Cofounder backgrounds span the major 
international development institutions operating in the 
Western Balkans and EU candidate states."

4-card grid (2 columns desktop, 1 column mobile), 24px gap.

CARD 1:
  Icon: globe / international
  Eyebrow: "EU INSTITUTIONS"
  H4: "EU Delegations and instruments."
  Body: "IPA III, Horizon Europe, Digital Europe Programme, 
        and bilateral EU institutional support frameworks."

CARD 2:
  Icon: handshake
  Eyebrow: "BILATERAL DONORS"
  H4: "GIZ, USAID, SDC, and others."
  Body: "Bilateral development agencies operating AI 
        capability and digital transformation programs in 
        the region."

CARD 3:
  Icon: bank / institution
  Eyebrow: "MULTILATERAL"
  H4: "World Bank, UNDP, UN agencies."
  Body: "Multilateral institutions designing AI capability 
        components within larger digital, governance, and 
        education programs."

CARD 4:
  Icon: building / government
  Eyebrow: "IMPLEMENTING INSTITUTIONS"
  H4: "Government and academic recipients."
  Body: "Ministries, agencies, universities, and 
        municipalities as program beneficiaries. We support 
        recipient-side program design and delivery."

═══ SECTION 4 — PROGRAM DESIGN COMPONENTS (bg-surface) ═══

Eyebrow: "PROGRAM DESIGN"
H2: "Six components of a defensible program."
Subhead (max 60ch): "Donor-grade AI capability programs 
require six components designed together. We do all six."

6-card grid (3 columns desktop, 2 tablet, 1 mobile), 24px gap.

CARD 1:
  Number (40px, ink-muted, weight 600): "01"
  H4: "Theory of Change"
  Body: "Causal logic from program activities to capability 
        outcomes to institutional impact, with explicit 
        assumptions and risks."

CARD 2:
  Number: "02"
  H4: "M&E Framework"
  Body: "Monitoring and evaluation framework with baseline, 
        midline, and endline indicators aligned with donor 
        reporting requirements."

CARD 3:
  Number: "03"
  H4: "Curriculum Architecture"
  Body: "Sequenced curriculum modules with bilingual 
        materials, certified instructor profiles, and 
        delivery format design."

CARD 4:
  Number: "04"
  H4: "Governance Components"
  Body: "EU AI Act alignment, ISO 42001 readiness, OECD 
        principles integration, and institutional policy 
        components."

CARD 5:
  Number: "05"
  H4: "Delivery Infrastructure"
  Body: "Local delivery architecture: instructor recruitment, 
        venue, technology, support systems, bilingual 
        production."

CARD 6:
  Number: "06"
  H4: "Sustainability Plan"
  Body: "Post-program sustainability: institutional 
        ownership, continued delivery capacity, and follow-on 
        funding pathway design."

═══ SECTION 5 — APPROACH (bg-base) ═══

Eyebrow: "APPROACH"
H2: "Proposal. Design. Deliver. Report."
Subhead (max 60ch): "A four-stage methodology across the 
full program lifecycle from proposal development through 
final donor reporting."

4-column horizontal block:

Step 1:
  Number: "01"
  H4: "Proposal"
  Body: "Proposal development, theory of change, budget 
        design, and M&E framework drafting for donor 
        submission."

Step 2:
  Number: "02"
  H4: "Design"
  Body: "Detailed program design once awarded: curriculum, 
        delivery infrastructure, governance components, 
        baseline study."

Step 3:
  Number: "03"
  H4: "Deliver"
  Body: "Multi-cohort program delivery with embedded quality 
        assurance and continuous adaptation."

Step 4:
  Number: "04"
  H4: "Report"
  Body: "Mid-term review, endline evaluation, donor reporting, 
        and sustainability handoff."

═══ SECTION 6 — FRAMEWORKS APPLIED (bg-surface) ═══

Eyebrow: "FRAMEWORKS APPLIED"
H2: "Built on international standards."
Subhead (max 60ch): "Donor programs require alignment with 
international AI governance frameworks and donor-specific 
M&E standards."

4-card grid, 24px gap.

CARD 1:
  Eyebrow: "REGULATION"
  H4: "EU AI Act"
  Body: "Required for EU-funded programs. Risk 
        classification, high-risk system obligations, 
        conformity assessment."
  Bottom: "Phasing 2025-2027"

CARD 2:
  Eyebrow: "MANAGEMENT SYSTEM"
  H4: "ISO/IEC 42001"
  Body: "AI management system: governance, risk, lifecycle, 
        continuous improvement. Frequently referenced in 
        donor governance components."
  Bottom: "Published 2023"

CARD 3:
  Eyebrow: "PRINCIPLES"
  H4: "OECD AI Principles"
  Body: "Standard reference for donor-funded AI capability 
        programs. Trustworthy AI principles widely adopted 
        across donor frameworks."
  Bottom: "46+ countries"

CARD 4:
  Eyebrow: "RISK FRAMEWORK"
  H4: "NIST AI RMF"
  Body: "Risk management framework with Generative AI Profile. 
        Increasingly referenced in donor program design."
  Bottom: "v1.0, 2023"

═══ SECTION 7 — FAQ (bg-base) ═══

Eyebrow: "FAQ"
H2: "Common questions."

6-question accordion:

1. Are donor programs different from regular advisory work?
"Yes. Donor programs operate under specific procurement 
frameworks, M&E requirements, and reporting structures. 
Program design must align with donor expectations from the 
proposal stage, not just delivery. We do both — design and 
delivery."

2. Can you support proposal development?
"Yes. We support proposal development for institutions 
applying for EU, World Bank, UNDP, or bilateral donor 
funding. Proposal support includes theory of change, M&E 
framework drafting, budget design, and technical 
specifications."

3. Do you have experience with EU IPA III and Horizon Europe?
"Cofounder backgrounds include experience with EU 
instruments, including IPA pre-accession instruments, 
Horizon programs, and EU Delegation-led capability building 
in the Western Balkans."

4. Can programs include EU AI Act compliance preparation?
"Yes. EU-funded programs increasingly require recipient 
institutions to demonstrate EU AI Act readiness. We 
incorporate EU AI Act preparation as a standard governance 
component. We don't certify compliance — certification is 
conducted by accredited bodies."

5. How long are typical donor programs?
"Single-institution programs typically run 12-24 months. 
Multi-institution sector programs 18-36 months. Train-the-
trainer capability infrastructure programs 24-36 months. 
Shorter pilot programs (3-9 months) are also possible."

6. Who delivers donor programs?
"Donor programs are led by Horizon4 cofounders with the most 
relevant institutional experience. Yllka Sela (Brandeis STEM 
MBA, 8 years at GIZ) typically leads economic development 
and bilateral donor programs. Mario Keputa (Cornell MPA, 
World Bank, OSCE) typically leads governance-heavy programs. 
For sector programs, cofounders are engaged based on sector."

═══ SECTION 8 — REQUEST FORM (bg-surface) ═══

Anchor id: #form
2-column layout, 64px gap.

LEFT:
  Eyebrow: "DISCUSS A PROGRAM"
  H2: "Tell us about your program."
  Body XL: "Whether you're a donor designing a program, an 
        implementing institution preparing a proposal, or 
        a partner organization seeking technical support, 
        we'll respond within 3 business days."
  Hairline divider
  Contact alternatives stacked:
    Eyebrow: "DIRECT EMAIL"
    Body: "programs@horizon4.ai"
    
    Eyebrow: "LOCATION"
    Body: "Tirana, Albania"
    Body (small, ink-muted): "Available regionally and 
          internationally"

RIGHT:
  Form card (white surface, 40px padding):
    Organization (text input)
    Your role (text input)
    Email (text input)
    Phone (text input, optional)
    Organization type (dropdown):
      Donor agency, EU institution, Multilateral, Bilateral, 
      Implementing institution, Partner organization, Other
    Program stage (dropdown):
      Pre-proposal exploration, Active proposal development, 
      Awarded program preparing for launch, Ongoing program 
      mid-cycle, Other
    Geographic focus (dropdown):
      Albania, Western Balkans regional, EU candidate states, 
      Multi-region, Other
    What you're exploring (textarea, 5 lines)
    Timeline (dropdown):
      Within 30 days, Within 90 days, This year, Exploring
    Preferred language (dropdown): English, Albanian, 
      Bilingual
    Submit button (primary accent, full width): "Discuss 
    Program"

═══ SECTION 9 — FINAL CTA (bg-deep) ═══

Eyebrow on dark: "PROGRAM PARTNERSHIPS"
H2 (white): "AI capacity, designed to last."
Subhead (light gray): "Multi-year programs built for donor 
M&E discipline and institutional sustainability."

CTAs (centered row):
  Primary (white button, navy text): "Discuss a Program" 
  → #form
  Secondary (white text link with arrow): "or request a 
  briefing →" → /executive-briefing

═══════════════════════════════════════════════════════════════
FINAL CONFIRMATION
═══════════════════════════════════════════════════════════════

After building, confirm:
1. Page inherits existing header and footer
2. NO sphere — full-width content hero
3. Eyebrow above H1 reads "ADVISORY · DONOR & EU PROGRAMS"
4. ZERO euro figures, ZERO "€" symbols
5. Anchor #form on the request form section
6. Yllka and Mario named as lead cofounders for donor 
   programs in FAQ
7. No em-dashes, no Western Balkan in body text
8. Form fields match exactly
</pasted_text>

## Assistant

_[tool: snip]_

_[tool: copy_files]_

Building **/donor-programs** by copying GovAI as a base, then restructuring (no engagement-types section, no related-horizons section, plus a new request-form section).

_[tool: run_script]_

_[tool: run_script]_

The script bailed because step 1 already changed the data-screen-label, so the App component's anchor no longer matches. Let me fix that and rerun:

_[tool: done]_

_[tool: eval_js]_

`/donor-programs` page is complete. All acceptance checks pass:

| Check | Result |
|---|---|
| 9 sections in correct order | ✓ Hero, What we design, Who we work with, Program design, Approach, Frameworks, FAQ, Request form, Final CTA |
| Hero eyebrow | ✓ "Advisory · Donor & EU Programs" |
| No engagement or related horizons cards | ✓ 0 of each |
| 3 archetype cards (Section 2) | ✓ |
| 4 Who-we-work-with cards (Section 3) | ✓ |
| 6 program-design components (Section 4) | ✓ |
| 4 frameworks (Section 6) | ✓ |
| 6 FAQ items | ✓ |
| Form anchor `#form` | ✓ |
| 10 form fields | ✓ (4 inputs + 5 selects + 1 textarea) |
| Zero `€` symbols | ✓ |
| Zero em-dashes in rendered text | ✓ |
| No horizontal overflow | ✓ |
| No console errors | ✓ |

**Highlights of the build:**
- New CSS variants added inline: `.arch-card` (large numbered cards), `.form-band` + `.form-grid` + `.form-card` + `.form-row` (right-column request form with focus rings and accent submit button), plus `.cta-actions` / `.btn-on-dark` / `.link-on-dark` for the dark-band CTA.
- Form has all spec-required fields: Organization, Your role, Email, Phone (optional), Organization type, Program stage, Geographic focus, What you're exploring (textarea), Timeline, Preferred language, plus the "Discuss Program" submit. Uppercase eyebrow-style labels, required-field asterisks in accent-primary, inline SVG dropdown chevrons.
- Hero `#form` link scrolls smoothly to the request form via standard anchor (no JS needed).
- Final CTA H2: *"AI capacity, designed to last."* — primary white-on-navy button to `#form`, secondary inline arrow link to `/executive-briefing`.
- "Western Balkan" phrasing removed from rendered copy: Section 3 subhead now reads "operating across the EU and candidate states", FAQ #3 reads "EU Delegation-led capability building in candidate states". (The form's Geographic-focus dropdown still includes "Western Balkans regional" as an option, since that's a literal geography selector the user chooses — different from marketing prose.)
- Yllka Sela and Mario Keputa both named as donor program leads in FAQ #6, per spec.
- Inherits Nav + Footer + design tokens from existing files. No other page modified.

## User

<pasted_text name="Pasted text (500 lines)">
Build THREE Research pages in this build:

1. /research/publications (focus — your strongest credibility 
   asset)
2. /research/insights (short-form writing, perspectives, 
   articles)
3. /research/frameworks (governance frameworks and reference 
   materials)

All three inherit the locked design system, header, and footer. 
Do NOT modify any other page.

═══════════════════════════════════════════════════════════════
GLOBAL RULES (REMINDER)
═══════════════════════════════════════════════════════════════

DESIGN TOKENS:
- Page background: bg-base #F0F2F5
- Surface: bg-surface #FFFFFF
- Dark band: bg-deep #0A1F44
- Card radius: 4px
- Standard typography and spacing scale

EYEBROWS: pure uppercase, no em-dashes, no symbols before.
HERO RULE: NO sphere on any Research page. Full-width 
centered content.
NO PRICING anywhere.
NO em-dashes, no Western Balkan, no fabricated stats.

═══════════════════════════════════════════════════════════════
PAGE 1 — /research/publications (PUBLISHED RESEARCH)
═══════════════════════════════════════════════════════════════

═══ SECTION 1 — HERO (bg-base, full-width) ═══

Centered max-width 880px, 160px top / 96px bottom padding.

Eyebrow (centered, accent-primary): "RESEARCH · PUBLICATIONS"

H1 (centered): "Published research on institutional AI 
capability."

Subhead (centered, Body XL, max 60ch):
"Books, working papers, and institutional analysis on AI 
transitions, capability development, and governance."

═══ SECTION 2 — FEATURED PUBLICATION (bg-surface) ═══

Eyebrow: "FEATURED"
H2: "Recent publication."

Single large publication card (full content width, 64px 
internal padding):

2-column layout inside card (40/60 split):

LEFT (40%) — Cover/visual placeholder:
- Card-within-card with bg-base
- Aspect ratio 3:4 (book cover proportions)
- Centered inside: "THE NEXT EUROPE" (small caps eyebrow, 
  accent-primary, 16px weight 600) on top, then 
  hairline divider, then thin 1px line break, then 
  "182 pages" (small, ink-muted) at bottom

RIGHT (60%) — Content:
  Top row (meta tags inline, with middle dots):
    "PUBLISHED · APRIL 2026" · "SSRN" · "BY MARIO KEPUTA"
    (small caps, ink-muted, 13px)
  
  Hairline divider
  
  H3 (32px weight 700): "The Next Europe: Why Europe Produces 
  Nobel Prize Winners but Not Elon Musks"
  
  Body XL: "A 182-page institutional analysis of Europe's 
  innovation and capability ecosystem. Examines structural 
  factors behind Europe's gap in producing transformational 
  founders and capability infrastructure, with implications 
  for institutional reform across EU and candidate states."
  
  Body (ink-body): "Key themes: institutional capability 
  development, innovation ecosystem design, EU policy 
  implications, and the gap between European scientific 
  excellence and entrepreneurial scale."
  
  Hairline divider
  
  3-column stats strip:
    Column 1: Number "260" (H3, accent-primary) / "Downloads" 
      (small caps eyebrow, ink-muted)
    Column 2: Number "490" / "Abstract views"
    Column 3: Number "182" / "Pages"
  
  Hairline divider
  
  CTAs row:
    Primary (accent-primary button): "Read on SSRN" → # 
      (placeholder URL — to be replaced with real SSRN link)
    Secondary (text link with arrow): "Download PDF →" → # 
      (placeholder)

═══ SECTION 3 — FORTHCOMING (bg-base) ═══

Eyebrow: "FORTHCOMING"
H2: "Working papers in development."

2-card grid, 24px gap:

CARD 1 (FORTHCOMING — 85% opacity, "FORTHCOMING" pill 
in ink-muted):
  Top tag (eyebrow, ink-muted): "FORTHCOMING · 2026"
  Hairline divider
  H4: "AI Infrastructure and the Superintelligence Race"
  Body: "Working paper on global AI infrastructure development, 
        compute access, and capability sovereignty for small 
        states. Examines policy options for EU candidate 
        states and the Western Balkans."
  Meta (ink-muted): "By Mario Keputa · In review"
  Bottom: "Available soon"

CARD 2 (FORTHCOMING — 85% opacity):
  Top tag (eyebrow, ink-muted): "PLANNED · 2027"
  Hairline divider
  H4: "Institutional AI Readiness in Small States"
  Body: "Comparative research on AI capability building in 
        small EU candidate states, with case studies from the 
        Western Balkans, Baltic states, and Eastern 
        Partnership."
  Meta (ink-muted): "By the Horizon4 team · Research stage"
  Bottom: "Available 2027"

═══ SECTION 4 — RESEARCH AREAS (bg-surface) ═══

Eyebrow: "RESEARCH AREAS"
H2: "Four ongoing research domains."
Subhead (max 60ch): "Horizon4 research spans four interconnected 
domains aligned with our advisory and capability work."

4-card grid (2x2 desktop, 1 column mobile), 24px gap:

CARD 1:
  Eyebrow: "DOMAIN 01"
  H4: "Institutional AI capability"
  Body: "How institutions develop, scale, and sustain AI 
        capability. Comparative studies, case studies, and 
        framework development."

CARD 2:
  Eyebrow: "DOMAIN 02"
  H4: "AI governance for small states"
  Body: "EU AI Act, ISO 42001, and OECD principles 
        implementation in small EU candidate states. 
        Implementation challenges and policy options."

CARD 3:
  Eyebrow: "DOMAIN 03"
  H4: "AI infrastructure sovereignty"
  Body: "Compute access, model sovereignty, data sovereignty, 
        and capability infrastructure for institutions and 
        small states."

CARD 4:
  Eyebrow: "DOMAIN 04"
  H4: "Education and capability transitions"
  Body: "Academic integrity, faculty readiness, curriculum 
        redesign, and capability transitions in higher 
        education and public sector institutions."

═══ SECTION 5 — FINAL CTA (bg-deep) ═══

Eyebrow on dark: "RESEARCH PARTNERSHIPS"
H2 (white): "Collaborate on research."
Subhead (light gray): "Horizon4 welcomes research 
collaborations with universities, think tanks, donor 
organizations, and institutional partners."

CTAs (centered row):
  Primary (white button): "Research Inquiry" → /contact
  Secondary (text link, white): "or explore our frameworks →" 
  → /research/frameworks

═══════════════════════════════════════════════════════════════
PAGE 2 — /research/insights (SHORT-FORM WRITING)
═══════════════════════════════════════════════════════════════

═══ SECTION 1 — HERO (bg-base, full-width) ═══

Eyebrow (centered, accent-primary): "RESEARCH · INSIGHTS"

H1 (centered): "Perspectives on institutional AI."

Subhead (centered, Body XL, max 60ch):
"Short-form analysis on AI policy, governance, capability 
building, and institutional transitions in the EU and 
Western Balkans."

═══ SECTION 2 — INSIGHTS GRID (bg-surface) ═══

Eyebrow: "RECENT INSIGHTS"
H2: "Latest perspectives."
Subhead (max 60ch): "Published insights from Horizon4 
leadership on institutional AI capability, governance, and 
the Western Balkans context."

3-card grid (3 columns desktop, 2 tablet, 1 mobile), 24px gap.

CARD 1 (COMING SOON — 85% opacity, COMING SOON pill):
  Top tag (eyebrow, ink-muted): "COMING SOON"
  Hairline divider
  H4: "Why AI capability is a sovereignty question"
  Body: "Most countries treat AI as a technology adoption 
        problem. It's actually a sovereignty question — about 
        compute, data, and capability infrastructure."
  Meta (ink-muted): "By Mario Keputa · Q3 2026"

CARD 2 (COMING SOON):
  Top tag (eyebrow, ink-muted): "COMING SOON"
  Hairline divider
  H4: "The EU AI Act in EU candidate states"
  Body: "Candidate states must adapt to EU AI Act before 
        accession. Most are unprepared. What it takes to 
        catch up."
  Meta (ink-muted): "By Mario Keputa · Q3 2026"

CARD 3 (COMING SOON):
  Top tag (eyebrow, ink-muted): "COMING SOON"
  Hairline divider
  H4: "Faculty readiness is the bottleneck"
  Body: "Universities cannot teach responsible AI use without 
        practical AI capability themselves. The faculty layer 
        is where AI integration succeeds or fails."
  Meta (ink-muted): "By Indri Dyrmishi · Q4 2026"

═══ SECTION 3 — INSIGHTS BY TOPIC (bg-base) ═══

Eyebrow: "BROWSE BY TOPIC"
H2: "Insights organized by research domain."

4-card grid (2x2 desktop, 1 column mobile), 24px gap.

Each card represents a topic category (no individual articles 
yet — placeholder structure):

CARD 1:
  Eyebrow: "TOPIC"
  H4: "AI Policy & Regulation"
  Body: "EU AI Act, ISO 42001, OECD Principles, and 
        implementation in candidate states."
  Meta (ink-muted): "Articles coming Q3 2026"

CARD 2:
  Eyebrow: "TOPIC"
  H4: "Institutional Capability"
  Body: "How institutions build, scale, and sustain AI 
        capability across government, education, and 
        business."
  Meta (ink-muted): "Articles coming Q3 2026"

CARD 3:
  Eyebrow: "TOPIC"
  H4: "Governance & Compliance"
  Body: "Governance operating models, oversight frameworks, 
        and compliance preparation across the four 
        Horizons."
  Meta (ink-muted): "Articles coming Q4 2026"

CARD 4:
  Eyebrow: "TOPIC"
  H4: "Western Balkans & EU Accession"
  Body: "AI capability and governance challenges specific to 
        EU candidate states and the Western Balkans context."
  Meta (ink-muted): "Articles coming Q4 2026"

═══ SECTION 4 — NEWSLETTER (bg-surface) ═══

Eyebrow: "NEWSLETTER"
H2: "Updates on new research."
Subhead (max 60ch): "Periodic updates when new publications, 
insights, and frameworks are released. No more than once per 
month."

2-column layout, 64px gap:

LEFT (60%):
  Body XL: "Subscribe to receive new publications, insights, 
        and framework releases. We publish in English and 
        Albanian."

RIGHT (40%):
  Form card (compact):
    Email (text input)
    Name (text input)
    Organization (text input, optional)
    Preferred language (dropdown): English, Albanian, Both
    Submit button (primary accent, full width): "Subscribe"

═══ SECTION 5 — FINAL CTA (bg-deep) ═══

Eyebrow on dark: "READ MORE"
H2 (white): "Explore Horizon4 research."

CTAs (centered row, 3 white text links separated by middle 
dots):
  "Publications" → /research/publications
  ·
  "Frameworks" → /research/frameworks
  ·
  "About the team" → /team

═══════════════════════════════════════════════════════════════
PAGE 3 — /research/frameworks (GOVERNANCE FRAMEWORKS)
═══════════════════════════════════════════════════════════════

═══ SECTION 1 — HERO (bg-base, full-width) ═══

Eyebrow (centered, accent-primary): "RESEARCH · FRAMEWORKS"

H1 (centered): "AI governance frameworks for institutions."

Subhead (centered, Body XL, max 60ch):
"Open frameworks, templates, and reference materials for 
institutions building AI governance capability. Released 
under open license for institutional use."

═══ SECTION 2 — FEATURED FRAMEWORK (bg-surface) ═══

Eyebrow: "FEATURED FRAMEWORK"
H2: "Horizon4 AI Readiness Scorecard."

Single large card, 64px internal padding, 2-column inside 
(50/50):

LEFT — Stylized scorecard preview:
- Card-within-card with bg-base, hairline border
- Top eyebrow (small caps): "SAMPLE · ANONYMISED"
- H4: "Six-Dimension Assessment"
- Hairline divider
- 6 dimension rows with mini progress bars (similar to 
  /audit hero):
  Strategic readiness: 65/100 (yellow)
  Governance readiness: 72/100 (green)
  Data readiness: 56/100 (yellow)
  Workflow readiness: 48/100 (red)
  Staff readiness: 61/100 (yellow)
  Procurement readiness: 70/100 (green)
- Hairline divider
- Bottom: "OVERALL: 62/100 · TIER: DEVELOPING"

RIGHT — Description:
  Top tag (eyebrow, accent-primary): "FRAMEWORK · OPEN"
  Hairline divider
  H3: "The Horizon4 AI Readiness Scorecard"
  Body XL: "A six-dimension institutional readiness assessment 
        framework. Used in Horizon4 audits and available as 
        an open reference for institutions building internal 
        AI capability."
  Body: "The framework assesses strategic, governance, data, 
        workflow, capability, and procurement readiness 
        against EU AI Act, ISO 42001, and OECD AI Principles."
  Hairline divider
  Meta (ink-muted, eyebrow): "AVAILABLE Q3 2026 · CREATIVE 
  COMMONS"
  CTA: "Request early access →" → /contact

═══ SECTION 3 — FRAMEWORK CATEGORIES (bg-base) ═══

Eyebrow: "FRAMEWORK CATEGORIES"
H2: "Frameworks in development."
Subhead (max 60ch): "Horizon4 is publishing a suite of open 
frameworks for institutional AI capability. Releases planned 
through 2027."

3-card grid (3 columns desktop, 2 tablet, 1 mobile), 24px gap.

CARD 1:
  Eyebrow: "READINESS"
  H4: "Institutional readiness assessment"
  Body: "Six-dimension readiness assessment for ministries, 
        universities, agencies, and businesses."
  Meta (ink-muted): "Available Q3 2026"

CARD 2:
  Eyebrow: "GOVERNANCE"
  H4: "Governance operating models"
  Body: "Reference architectures for institutional AI 
        governance: oversight bodies, decision authority, 
        approval workflows."
  Meta (ink-muted): "Available Q4 2026"

CARD 3:
  Eyebrow: "POLICY"
  H4: "Policy templates"
  Body: "Open policy templates for institutional AI use, 
        academic integrity, procurement governance, and 
        confidentiality."
  Meta (ink-muted): "Available 2027"

═══ SECTION 4 — INTERNATIONAL FRAMEWORKS WE BUILD ON (bg-surface) ═══

Eyebrow: "BUILT ON"
H2: "International AI governance standards."
Subhead (max 60ch): "Horizon4 frameworks build on and adapt 
international standards for the EU candidate state and 
Western Balkans context."

4-card grid, 24px gap.

CARD 1:
  Eyebrow: "REGULATION"
  H4: "EU AI Act"
  Body: "Risk classification, high-risk system obligations, 
        transparency requirements, conformity assessment 
        readiness."
  Bottom: "Phasing 2025-2027"

CARD 2:
  Eyebrow: "MANAGEMENT SYSTEM"
  H4: "ISO/IEC 42001"
  Body: "AI management system requirements: governance, risk, 
        lifecycle, continuous improvement."
  Bottom: "Published 2023"

CARD 3:
  Eyebrow: "PRINCIPLES"
  H4: "OECD AI Principles"
  Body: "Trustworthy AI: inclusivity, transparency, 
        accountability, safety, human-centered values."
  Bottom: "46+ countries"

CARD 4:
  Eyebrow: "RISK FRAMEWORK"
  H4: "NIST AI RMF"
  Body: "Risk management framework with Generative AI Profile. 
        Practical, voluntary, widely adopted."
  Bottom: "v1.0, 2023"

═══ SECTION 5 — REQUEST EARLY ACCESS (bg-base) ═══

Eyebrow: "EARLY ACCESS"
H2: "Get frameworks before public release."
Subhead (max 60ch): "Institutions piloting Horizon4 frameworks 
get early access, implementation support, and the opportunity 
to shape framework design through feedback."

2-column layout, 64px gap.

LEFT:
  Body XL: "Early access is available to institutional users 
        committing to provide structured feedback during the 
        pilot phase. No cost, no commitment beyond feedback 
        provision."

RIGHT:
  Form card (compact):
    Organization (text input)
    Your role (text input)
    Email (text input)
    Institution type (dropdown):
      Ministry, Agency, University, Municipality, Public 
      enterprise, Donor program, Other
    Frameworks of interest (multi-select dropdown):
      Readiness assessment, Governance operating model, 
      Policy templates, All
    What you would pilot (textarea, 4 lines)
    Submit button (primary accent, full width): "Request 
    Early Access"

═══ SECTION 6 — FINAL CTA (bg-deep) ═══

Eyebrow on dark: "FRAMEWORKS IN ACTION"
H2 (white): "Frameworks are part of every engagement."
Subhead (light gray): "Horizon4 frameworks are not just 
documents — they're the basis for our audit, advisory, and 
capability work."

CTAs (centered row):
  Primary (white button): "Explore Advisory" → /advisory
  Secondary (text link, white): "or read our publications →" 
  → /research/publications

═══════════════════════════════════════════════════════════════
FINAL CONFIRMATION
═══════════════════════════════════════════════════════════════

After building all 3 pages, confirm:
1. All 3 pages inherit existing header and footer
2. NO sphere on any page — full-width content
3. /research/publications has "The Next Europe" featured with 
   real stats: 260 downloads, 490 abstract views, 182 pages
4. /research/insights has 3 "Coming Soon" article cards (no 
   fake article links)
5. /research/frameworks featured framework is the Readiness 
   Scorecard with sample preview
6. ZERO euro figures, ZERO em-dashes, ZERO Western Balkan 
   references in body text (note: "Western Balkans" can 
   appear as a place reference in research domain 
   descriptions — it's a legitimate geographic term, just 
   not positioning language)
7. All forms have appropriate placeholder fields
8. All CTAs route to correct paths
</pasted_text>

## Assistant

_[tool: snip]_

_[tool: copy_files]_

Three research pages, all from the Donor Programs base which has the form CSS we'll need for Insights and Frameworks. Starting with **Page 1 — Publications**.

_[tool: run_script]_

Now write **Page 1 — /research/publications** content via run_script.

_[tool: done]_

_[tool: run_script]_

**Page 1 done.** Now **Page 2 — /research/insights**.

_[tool: done]_

_[tool: run_script]_

**Page 2 done.** Now **Page 3 — /research/frameworks** (most complex, with the scorecard preview).

_[tool: done]_

_[tool: eval_js]_

All three Research pages are complete. Final summary:

| # | File | Hero eyebrow | Sections | Key features |
|---|---|---|---|---|
| 1 | `Horizon4 AI - Publications.html` | Research · Publications | 5 | Featured "The Next Europe" with real stats (260 downloads, 490 abstract views, 182 pages), 2 forthcoming working papers, 4 research domain cards, dark-band CTA → /contact and /research/frameworks |
| 2 | `Horizon4 AI - Insights.html` | Research · Insights | 5 | 3 "Coming Soon" insight cards (no fake article links), 4 topic cards in 2×2 grid, newsletter form (Email/Name/Org/Lang), triple-link dark CTA → publications/frameworks/team |
| 3 | `Horizon4 AI - Frameworks.html` | Research · Frameworks | 6 | Featured Readiness Scorecard with live mini progress bars (Strategic 65/yellow, Governance 72/green, Data 56/yellow, Workflow 48/red, Staff 61/yellow, Procurement 70/green; Overall 62 · Developing), 3 category cards, 4 international standards, early-access form (6 fields), dark CTA → /advisory and /research/publications |

**Verified across all three:**
- Same Nav + Footer + design tokens inherited from existing files
- No sphere in any hero (all use the centered `.gov-hero` shell, max 880px, 160px/96px padding)
- Zero `€` symbols, zero specific euro figures
- Zero em-dashes in rendered text on each page (verified by `document.body.innerText.match(/—/g)`)
- No horizontal overflow
- No console errors

**"Western Balkans" usage** — per your note, "Western Balkans" is allowed as a *place reference* in research domain descriptions. It appears intentionally on:
- Publications forthcoming Card 1: "policy options for EU candidate states and the Western Balkans" (research scope)
- Publications forthcoming Card 2: "case studies from the Western Balkans, Baltic states, and Eastern Partnership" (geographic case scope)
- Insights hero subhead: "...in the EU and Western Balkans" (research geographic scope)
- Insights "Browse by topic" Card 4: "Western Balkans & EU Accession" (named topic category)
- Frameworks "Built on" subhead: "the EU candidate state and Western Balkans context"

All are legitimate geographic references within research framing, not positioning language.

**Scorecard preview** — used real CSS values (`width: {val}%` inline style) with the 3 status color tokens already in `tokens.css` (`--status-good`, `--status-warn`, `--status-bad`). Bars render cleanly across viewports.

No other pages modified.

## User

Save this design as a PDF: the current design

## Assistant

_[tool: snip]_

_[tool: copy_files]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

Clean. Opening for print:

_[tool: open_for_print]_

Opened the Frameworks page in a new tab — print dialog should pop automatically once fonts and React mount. If your browser blocked it, open manually:

**[Open Frameworks for printing →](https://019e005d-f02a-74ab-afec-b0e65f0494ba.claudeusercontent.com/v1/design/projects/019e005d-f02a-74ab-afec-b0e65f0494ba/serve/Horizon4%20AI%20-%20Frameworks-print.html?t=a5a85b62159cad4f529245764cb4f49f34c2c943a3f2f6e6161cfcff80a601ed.a00db0e5-829b-4316-95b5-1b03f7a81a45.a6eaddb4-8ff2-4d88-946d-800f388663dd.1778992234&direct=1)**

Then choose **Save as PDF** in the print destination. The print stylesheet sets A4 portrait, hides the nav, forces each section onto its own page with the dark CTA band preserved, auto-opens the FAQ-style `<details>` so answers print in full, and strips hover states.

## User

<system-info comment="Only acknowledge these if relevant">
User is viewing file: Horizon4 AI - Course Catalog.html
</system-info>

<pasted_text name="Pasted text (148 lines)">
Single surgical fix to site-wide routing. The nav links in 
Header (and footer, and inline CTAs) currently point to clean 
paths like /academy, /govai, /audit, but the actual HTML files 
have spaces in their names (e.g., "Horizon4 AI - GovAI.html"). 
This causes all nav clicks to fail.

═══════════════════════════════════════════════════════════════
ACTION — UPDATE scripts/chrome.jsx ROUTES MAP
═══════════════════════════════════════════════════════════════

Locate the ROUTES map (or routing logic) in scripts/chrome.jsx.

REPLACE OR ADD this routing map so clean paths resolve to the 
actual filenames:

ROUTE MAP (clean path → actual filename):

  "/"                          → "Horizon4 AI - Homepage.html"
  "/academy"                   → "Horizon4 AI - Academy.html"
  "/academy/catalog"           → "Horizon4 AI - Course Catalog.html"
  "/academy/private"           → "Horizon4 AI - Academy Private.html"
  "/advisory"                  → "Horizon4 AI - Advisory.html"
  "/audit"                     → "Horizon4 AI - Audit.html"
  "/executive-briefing"        → "Horizon4 AI - Executive Briefing.html"
  "/donor-programs"            → "Horizon4 AI - Donor Programs.html"
  "/govai"                     → "Horizon4 AI - GovAI.html"
  "/eduai"                     → "Horizon4 AI - EduAI.html"
  "/businessai"                → "Horizon4 AI - BusinessAI.html"
  "/strategyai"                → "Horizon4 AI - StrategyAI.html"
  "/agentic-ai"                → "Horizon4 AI - Agentic AI.html"
  "/research/publications"     → "Horizon4 AI - Publications.html"
  "/research/insights"         → "Horizon4 AI - Insights.html"
  "/research/frameworks"       → "Horizon4 AI - Frameworks.html"
  "/about"                     → "Horizon4 AI - About.html"
  "/team"                      → "Horizon4 AI - Team.html"
  "/contact"                   → "Horizon4 AI - Contact.html"

═══════════════════════════════════════════════════════════════
ROUTING BEHAVIOR
═══════════════════════════════════════════════════════════════

Implement client-side routing logic:

1. When any nav <a> tag or CTA link with a clean path (like 
   "/govai") is clicked, intercept the click and navigate to 
   the corresponding actual filename instead.

2. Two approaches — pick whichever works best for the current 
   Claude Design environment:

   APPROACH A — URL rewriting via JavaScript:
   - Add an event listener to all <a> tags
   - On click, check if href matches a clean path in the 
     ROUTES map
     - If yes: preventDefault() and window.location.href = 
       mapped filename
     - If no: let default behavior continue
   
   APPROACH B — Server-side redirects (if hosting supports):
   - Add a redirects configuration mapping clean paths to 
     filenames

3. Apply this routing across ALL existing pages — homepage, 
   academy pages, advisory pages, solutions pages, research 
   pages, about, team, contact.

4. Footer links, inline CTAs (Primary buttons, Secondary 
   buttons, text links), and mega-menu items all use the 
   clean path. The routing layer translates clean → filename.

═══════════════════════════════════════════════════════════════
ADDITIONAL ROUTE-RELATED FIXES
═══════════════════════════════════════════════════════════════

1. The homepage exists as two files:
   - "Horizon4 AI - Homepage.html" (the real, complete one)
   - "Homepage.html" (a duplicate/test file)
   
   Configure routing so "/" → "Horizon4 AI - Homepage.html" 
   ONLY. The other Homepage.html should be ignored or 
   redirected to "Horizon4 AI - Homepage.html" as well.

2. The Academy mega-menu link "Course Catalog" should resolve 
   correctly to the actual "Horizon4 AI - Course Catalog.html" 
   file.

3. Mailto: links (e.g., mailto:hello@horizon4.ai) should NOT 
   be intercepted by the routing logic — let them open in the 
   user's mail client as normal.

4. External links (URLs starting with http:// or https://) 
   should NOT be intercepted — let them open normally.

5. Anchor links within the same page (e.g., #form) should NOT 
   be intercepted — let them scroll to the anchor.

═══════════════════════════════════════════════════════════════
TESTING / CONFIRMATION
═══════════════════════════════════════════════════════════════

After applying, verify the following links work from any page:

From Homepage:
- Header: Academy → opens Academy page
- Header: Advisory → opens Advisory page
- Header: Solutions dropdown → GovAI opens GovAI page, EduAI 
  opens EduAI page, etc.
- Header: Research → Publications opens Publications page
- Header: About dropdown → Team opens Team page
- "Request Executive Briefing" button → Executive Briefing 
  page
- Section CTAs (Explore Capability Pathways, etc.) → correct 
  destination
- Footer links → all resolve to correct pages

From any subpage:
- All header links work
- All inline CTAs work
- All footer links work
- Logo click → goes to homepage
- Same-page anchor links (#form) → scroll within page
- mailto: links → open mail client
- Cross-page CTAs (Request Audit Scope, etc.) → correct page

═══════════════════════════════════════════════════════════════
NON-NEGOTIABLE
═══════════════════════════════════════════════════════════════

- ALL clean nav paths resolve to actual HTML files
- NO modification to any individual page's content
- NO modification to design tokens, typography, or layout
- mailto: and external links remain unintercepted
- Same-page anchors (#form, #pricing, etc.) remain 
  unintercepted
- Routing applied universally across all existing pages

═══════════════════════════════════════════════════════════════
CONFIRMATION
═══════════════════════════════════════════════════════════════

After applying, confirm:
1. ROUTES map updated in scripts/chrome.jsx
2. Click any nav link from homepage → opens the correct page
3. Click logo from any page → goes to homepage
4. Click mega-menu item from any page → opens correct page
5. All footer links work site-wide
6. mailto: and external links still work normally
7. Anchor links within same page still scroll to anchor
</pasted_text>

## Assistant

_[tool: snip]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

I see the situation. Pre-existing pages use `chrome.jsx`'s `route()` (which silently falls through for missing entries). My newer Solutions/Research/Donor pages have inline Nav with hardcoded clean paths — different broken path.

**Two-part fix:**
1. Update `chrome.jsx` ROUTES with all missing paths (fixes chrome-using pages).
2. Add a click-interceptor script to the 9 pages that have inline Nav (no chrome.jsx).

_[tool: run_script]_

Now add a click interceptor to my 9 pages with inline Nav. I'll inject it into the existing suppression script block in each.

_[tool: write_file]_

Now handle the duplicate `Homepage.html` — convert it into a meta-refresh redirect to the real homepage so direct visits land in the right place:

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: show_html]_

Click interceptor confirmed working on `/audit` — router preventDefault fires before bubble. Now spot-check a chrome.jsx-using page (Advisory) gets the new routes:

_[tool: sleep]_

_[tool: eval_js]_

All chrome.jsx-rendered nav links now resolve to actual filenames. Routing fully working.

_[tool: done]_

Routing fixed site-wide.

**Changes:**

| File | Change |
|---|---|
| `scripts/chrome.jsx` | ROUTES map updated — added 9 missing entries: `/donor-programs`, `/govai`, `/eduai`, `/businessai`, `/strategyai`, `/agentic-ai`, `/research/publications`, `/research/insights`, `/research/frameworks` |
| 10 inline-Nav pages | Click interceptor added to the existing head suppression script. Catches `<a>` clicks on clean paths, calls `preventDefault()`, navigates to the mapped filename via `encodeURI()`. Mailto/tel/http/https/anchor links pass through untouched. |
| `Homepage.html` (duplicate) | Replaced with a meta-refresh + `location.replace` to "Horizon4 AI - Homepage.html" — any direct visit lands on the real homepage |

**Pages that now route correctly:**
- Pre-existing (use chrome.jsx + `route()`): Homepage, Academy, Course Catalog, Academy Private, Advisory, Audit, Executive Briefing, About, Team, Contact
- New (got the click interceptor): GovAI, EduAI, BusinessAI, StrategyAI, Agentic AI, Donor Programs, Publications, Insights, Frameworks (+ Frameworks-print)

**Verified:**
- `route('/govai')` → `"Horizon4 AI - GovAI.html"` ✓
- `route('/research/publications')` → `"Horizon4 AI - Publications.html"` ✓
- Mega menu's 12 rendered hrefs on Advisory page are all actual filenames ✓
- Programmatic click on `<a href="/audit">` in GovAI page intercepted (`defaultPrevented: true`) before native navigation ✓
- No console errors

**Untouched per non-negotiable:**
- No page content, design tokens, typography, or layout modified
- `mailto:`, `tel:`, `http://`, `https://`, and `#` links pass through unintercepted (verified by the early-exit branches in the interceptor)

