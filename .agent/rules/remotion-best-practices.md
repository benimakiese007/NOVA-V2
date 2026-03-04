---
name: Remotion Best Practices
description: Guidelines for creating high-quality React-based videos using Remotion, focusing on animations, layout, and performance.
activation: Glob
pattern: "**/*.{ts,tsx}"
---

# Remotion Best Practices

Follow these patterns and constraints when developing Remotion components to ensure smooth animations and maintainable code.

## Core Principles
1. **Absolute Layouts**: Always use `<AbsoluteFill>` as the primary container for video frames to ensure correct positioning regardless of overlay depth.
2. **Natural Motion**: Prefer `spring()` animations over linear interpolations for a more premium, professional feel.
3. **Clamping**: Always clamp animation progress values using `Math.max(0, Math.min(1, progress))` to avoid visual artifacts outside the intended range.
4. **Modularity**: Break down complex scenes into smaller, reusable functional components (e.g., `Highlight`, `Subtitle`, `ProgressBar`).

## Technical Guidelines

### Animations
- Use `useCurrentFrame()` to drive all time-based logic.
- Use `useVideoConfig()` to access `fps`, `width`, `height`, and `durationInFrames`.
- Define animation delays and durations as constants for easy adjustment.

### Styling
- Use inline styles for dynamic properties (transforms, colors, opacity).
- Use `transformOrigin` (e.g., `left center`) to control the direction of wipe or scale effects.
- Leverage `position: 'absolute'` and `position: 'relative'` appropriately for layering effects.

### Assets & Fonts
- Load fonts using `@remotion/google-fonts` to ensure they are available before rendering.
- Extract font families via `loadFont().fontFamily`.

## Example Pattern (Highlight Wipe)
When implementing a text highlight, use a background span with a `scaleX` transform driven by a `spring` animation:

```tsx
const highlightProgress = spring({
    fps,
    frame,
    config: { damping: 200 },
    delay,
    durationInFrames,
});
const scaleX = Math.max(0, Math.min(1, highlightProgress));

// Inside return:
<span style={{ 
    position: 'absolute', 
    transform: `scaleX(${scaleX})`, 
    transformOrigin: 'left center' 
}} />
```

## Maintenance
- Keep scene-specific data (text content, colors, timing) in cleanly defined constants at the top of the file.
- Use TypeScript interfaces for component props to ensure type safety.
