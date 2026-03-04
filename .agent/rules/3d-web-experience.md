---
name: 3d-web-experience
description: "Guidelines for bringing 3D scenes (Three.js, R3F, Spline) to the web with performance and usability."
activation_mode: model_decision
---

# 3D Web Experience

Use this rule when integrating 3D models, scenes, or WebGL-driven interfaces.

## Technology Stack
- **Spline**: For fast integration of descriptive 3D elements.
- **React Three Fiber (R3F)**: For complex, state-driven 3D in React apps.
- **Three.js (Vanilla)**: For manual control and maximum performance.

## Optimization & Pipeline
- **Asset Optimization**: Use GLB/GLTF. Reduce poly count (< 100K) and bake textures.
- **Compression**: Use `gltf-transform` with Draco and WebP texture compression.
- **Loading States**: Always provide a progress indicator or placeholder while the 3D scene initializes.

## Best Practices
- **Purposeful 3D**: Only use 3D if it enhances the user experience (e.g., product visualization). Avoid "3D for 3D's sake."
- **Mobile First**: Test on real devices. Reduce quality or provide a static fallback for low-end hardware.
- **Scroll Integration**: Use GSAP ScrollTrigger or `useScroll` (R3F) to link 3D movement to user scrolling.

## ❌ Anti-Patterns
- ❌ Heavy 3D assets (> 5MB) that stall the main thread.
- ❌ Lack of fallback for browsers with disabled WebGL.
- ❌ Overwhelming navigation that confuses the user within a 3D space.
