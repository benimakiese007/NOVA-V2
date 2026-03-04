---
name: web-interface-guidelines
description: "Standards for UI/UX excellence, accessibility (WCAG), and visual consistency."
activation_mode: model_decision
---

# Web Interface Guidelines

Use this rule to audit and improve UI code for accessibility, visual consistency, and UX best practices.

## Accessibility (A11y)
- **Contrast**: Maintain readable color contrast ratios (WCAG AA standard).
- **Semantics**: Use proper HTML5 elements (`<button>`, `<main>`, `<nav>`).
- **Interaction**: Ensure all interactive elements have focus states and are keyboard-navigable.
- **ARIA**: Use ARIA labels only when semantic HTML is insufficient.

## Visual Consistency
- **Grid & Alignment**: Align all elements to a consistent grid system.
- **Hierarchy**: Use font sizes, weights, and whitespace to guide the user's eye to the most important content.
- **Feedback**: Provide immediate visual feedback for all user actions (hover, click, loading, error).

## UX Best Practices
- **Efficiency**: Minimize the number of clicks required to complete a task.
- **Clarity**: Use clear, concise labels and avoid industry jargon.
- **Error Handling**: Show helpful error messages and clearly indicate which fields need attention.

## ❌ Anti-Patterns
- ❌ Using generic "Click here" links.
- ❌ Fixed-height containers that overflow when text size is increased.
- ❌ Over-reliance on color alone to convey meaning (e.g., red only for errors).
