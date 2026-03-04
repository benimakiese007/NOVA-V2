---
name: immersive-scroll-experience
description: "Standards for scroll-driven storytelling, parallax, and cinematic web narratives using GSAP or Framer Motion."
activation_mode: model_decision
---

# Immersive Scroll Experience

Use this rule when building narrative-driven pages with heavy scroll animations or parallax effects.

## Animation Tools
- **GSAP ScrollTrigger**: The industry standard for complex, high-performance scroll timelines.
- **Framer Motion**: Excellent for React-based scroll reveals and simple parallax.
- **Lenis**: Use for high-quality smooth scrolling without breaking native behavior.

## Narrative Patterns
- **Parallax**: Use different layer speeds (BG: 0.2x, Content: 1.0x, FG: 1.2x) to create depth.
- **Sticky Sections**: Pin key elements (e.g., a product image) while scrolling through its features.
- **Horizontal Scroll**: Implement using GSAP to transform vertical scroll into horizontal movement for galleries.

## Performance & Accessibility
- **Avoid Scroll Hijacking**: Never replace native scroll behavior entirely. Enhance it instead.
- **Smoothness**: Use `will-change: transform` and avoid animating properties like `width` or `top` that cause reflow.
- **Reduce Motion**: Respect `prefers-reduced-motion` by disabling or simplifying animations.

## ❌ Anti-Patterns
- ❌ Animation overload that distracts from the core content.
- ❌ Laggy scroll experiences on mobile due to unoptimized triggers.
- ❌ Hiding critical navigation or CTA behind complex scroll requirements.
