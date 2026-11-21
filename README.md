# Cinematic Portfolio Hero

A fullscreen, sticky, cinematic hero section built with Next.js App Router,
React, Three.js and GSAP.

## ⚠️ Add your video first

No video file was provided in this conversation, so the hero currently
points at a video that doesn't exist yet. Before running the project:

1. Export your talking-head video as `hero.mp4` (H.264, ideally under
   15–20MB for smooth looping — compress with Handbrake or `ffmpeg` if needed).
2. Drop it in `public/videos/hero.mp4`.
3. Optional but recommended: add a first-frame still as
   `public/videos/hero-poster.jpg` so there's no flash of black while the
   video buffers.

The same file is used for both the sharp foreground video and the blurred
ambient background layer — no need to export two versions.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's inside

- `app/page.tsx` — renders the `<Hero />` with your name, tagline, and role.
  Edit the props there to personalize the copy.
- `components/Hero.tsx` — video layers, GSAP entrance timeline, play/pause
  + mute/unmute controls, "tap for sound" hint, scroll indicator, and the
  REC-timecode / viewfinder-corner signature elements.
- `components/Hero.module.css` — all hero styling, including the
  glassmorphism controls and cinematic gradient overlays. Design tokens
  (colors, fonts) live in `app/globals.css` as CSS custom properties.
- `components/ParticleField.tsx` — the Three.js bokeh/particle layer
  (warm orange + cool white, additive blending, sine-wave drift, mouse
  parallax). Pixel ratio is capped and the point count is kept modest
  (90 particles) to stay smooth on mid-range hardware.

## Customizing

- **Copy**: change `firstName`, `lastName`, `tagline`, and `role` props in
  `app/page.tsx`.
- **Colors**: all theme colors are CSS variables at the top of
  `app/globals.css` (`--color-ember`, `--color-monitor`, etc.) — change
  them once and every layer updates.
- **Particle density / color balance**: `COUNT` and the `uEmberColor` /
  `uCoolColor` uniforms in `ParticleField.tsx`.
- **Scroll target**: the scroll indicator scrolls to the element with
  `id="next-section"` — rename that id (in both `page.tsx` and
  `Hero.tsx`) if you restructure the page.

## Notes on performance

- The particle canvas uses a capped device pixel ratio and additive-blended
  point sprites rather than meshes, so it stays cheap even with the video
  playing underneath.
- Both videos use `playsInline` and `muted` (foreground unmutes on user
  interaction) so autoplay works reliably on iOS Safari.
- `prefers-reduced-motion` disables camera parallax and shortens/removes
  CSS animations.
