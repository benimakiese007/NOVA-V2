---
name: Responsive Layout Standards
description: Enforces mobile-first HTML/CSS development using flexible layouts (Flex/Grid) and strict adherence to breakpoint and overflow standards.
activation: Always On
---

# Responsive Layout Standards

All HTML and CSS generation must adhere to these mobile-first and flexible design principles.

## Core Layout Rules
1. **Mobile-First**: Always write base styles for mobile screens first, then use media queries to enhance for larger screens.
2. **Flexible Containers**: 
   - Never use fixed widths in pixels (e.g., `width: 800px`).
   - Use `max-width` for containers to ensure they don't grow too large.
   - Use percentages or relative units (`rem`, `em`, `vw`, `vh`) for widths.
3. **Layout Engines**: Exclusively use **Flexbox** or **CSS Grid** for structural layouts.
4. **Positioning**: Avoid `position: absolute` unless strictly necessary (e.g., overlays, tooltips). Prefer document flow techniques.
5. **Overflow Control**: Ensure `overflow-x: hidden` (or equivalent) is maintained where necessary to prevent horizontal scrolling on mobile.

## Standard Breakpoints
Use the following media query breakpoints for consistency:
- **Tablet**: `@media (min-width: 768px)`
- **Desktop**: `@media (min-width: 1024px)`

## Code Quality
- Keep CSS clean, structured, and modular.
- Use semantic HTML tags (`<header>`, `<main>`, `<section>`, `<footer>`).
- Ensure all interactive elements are easily tappable on mobile devices.

## Example Pattern
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; /* Mobile first */
}

@media (min-width: 768px) {
  .container {
    flex-direction: row; /* Tablet/Desktop */
  }
}
```
