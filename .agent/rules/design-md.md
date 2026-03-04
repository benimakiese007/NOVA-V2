---
name: design-md
description: "Analyze Stitch projects and synthesize a semantic design system into DESIGN.md files. Use when working with Stitch MCP tools and generating design documentation."
activation_mode: model_decision
---

# Design MD (Stitch Analysis)

Use this rule to analyze Stitch project assets (screens, code, metadata) and synthesize a semantic design system into a `DESIGN.md` file.

## Core Objective
Create a "source of truth" `DESIGN.md` that allows Stitch to generate new screens aligned with existing design language. Focus on **Visual Descriptions** supported by specific color values.

## Analysis Process

1. **Information Retrieval (Stitch MCP)**:
   - Use `mcp_stitch:list_projects` and `mcp_stitch:list_screens`.
   - Fetch metadata with `mcp_stitch:get_screen` and `mcp_stitch:get_project`.
   - Download assets (HTML, screenshot) for visual and code analysis.

2. **Synthesis Steps**:
   - **Atmosphere**: Describe the "vibe" (e.g., "Airy," "Minimalist").
   - **Colors**: Map the palette with descriptive names + Hex codes (e.g., "Deep Muted Teal-Navy (#294056)").
   - **Geometry**: Translate technical values (e.g., `rounded-full` -> "Pill-shaped").
   - **Elevation**: Describe shadows and depth (e.g., "Whisper-soft diffused shadows").

## Output Structure (DESIGN.md)

```markdown
# Design System: [Project Title]
**Project ID:** [Project ID]

## 1. Visual Theme & Atmosphere
(Mood and aesthetic philosophy)

## 2. Color Palette & Roles
(Descriptive Name + Hex Code + Functional Role)

## 3. Typography Rules
(Font families, weights, character)

## 4. Component Stylings
- **Buttons**: Shape, color, behavior.
- **Cards/Containers**: Roundness, background, shadow.
- **Inputs/Forms**: Stroke, background.

## 5. Layout Principles
(Whitespace, margins, grid)
```

## Best Practices
- **Semantic Naming**: Name colors by purpose, not just appearance.
- **Technical Precision**: Always include exact Hex codes or values in parentheses.
- **Evocative Language**: Use designer-friendly terms to help visualization.
- **Avoid Jargon**: Translate technical classes (Tailwind/CSS) into physical descriptions.
