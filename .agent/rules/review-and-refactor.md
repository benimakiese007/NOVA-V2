---
name: Review and Refactor
description: Guide quality improvements and DRY principles.
activation: Model Decision
---

# Review and Refactor

This rule guides the improvement of code quality and maintainability during code changes.

## Quality Checklist
1. **Correctness**: Verify the logic handles all intended use cases.
2. **Edge Cases**: Check for `null`, `undefined`, empty states, and error conditions.
3. **DRY (Don't Repeat Yourself)**: Extract repeated logic into reusable components or utility functions.
4. **Performance**: Identify bottlenecks like redundant DOM selections or expensive loops.

## Refactoring Goal
Always aim to leave the code cleaner than you found it. Propose refactors that reduce technical debt without changing intended behavior.
