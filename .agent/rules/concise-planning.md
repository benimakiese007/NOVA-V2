---
name: concise-planning
description: "Transform user requests into a concrete, actionable plan with minimal friction. Use at the start of complex tasks."
activation_mode: model_decision
---

# Concise Planning

Use this rule to create a structured implementation plan before starting work on a complex objective.

## 1. Context Scanning
Before proposing a plan, scan the project for:
- Existing documentation (`README.md`, `ARCHITECTURE.md`).
- Core technologies (languages, frameworks, test suites).
- Recent changes and relevant code logic.

## 2. Minimal Interaction
- Aim for maximum autonomy.
- Ask at most 1–2 truly blocking questions.
- Make reasonable assumptions for non-blocking unknowns and document them.

## 3. Plan Generation (Template)
Your plan must follow this structure:
### Approach
A short (2–3 sentence) summary of the technical solution.

### Scope
- **Inclusions**: What will be changed.
- **Exclusions**: What is out of scope.

### Action Plan
A checklist of 6–10 verb-first items (e.g., "Create...", "Update...", "Refactor..."). Be specific about file paths or modules.

### Validation
How the user or agent will verify the changes.

## 4. Best Practices
- Keep steps atomic and logical.
- Prioritize dependencies first.
- Ensure the plan is approved before moving to execution.
