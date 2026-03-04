---
name: tailwind-design-system
description: "Guidelines for building scalable design systems with Tailwind CSS tokens and components."
activation_mode: model_decision
---

# Tailwind Design System

Use this rule when creating component libraries, implementing design tokens, or standardizing UI patterns with Tailwind CSS.

## Design Tokens & Configuration
- **Color Palettes**: Use semantic names (`primary`, `secondary`, `success`) rather than literal colors (`blue-500`).
- **Typography**: Define font-family, sizes, and weights in `tailwind.config.js` to ensure consistency.
- **Spacing**: Stick to the standard Tailwind spacing scale (multiples of 4px) to maintain rhythm.

## Component Patterns
- **Consistency**: Use `@apply` sparingly; prefer utility classes for transparency but use components (React/Vue/HTML templates) for reuse.
- **Variants**: Handle states (hover, focus, active, dark mode) consistently across all buttons and inputs.
- **Responsiveness**: Use the mobile-first approach (e.g., `text-sm md:text-base`).

## Architecture
- **Layering**: Organize styles into `base`, `components`, and `utilities` for better specificity control.
- **Plugins**: Use the official plugins (forms, typography, aspect-ratio) for complex standard elements.

## ❌ Anti-Patterns
- ❌ Ad-hoc "magic numbers" in arbitrary values (e.g., `h-[123px]`).
- ❌ Nesting too deep with `@apply` which makes debugging difficult.
- ❌ Overwriting too many default Tailwind values instead of extending them.
