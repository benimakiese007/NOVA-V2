---
name: Documentation Style
description: Mandatory JSDoc for JavaScript files.
activation: Glob
pattern: "*.js"
---

# Documentation Style

Ensure the codebase remains understandable for future maintenance.

## Requirements
1. **JSDoc**: Every function and class must have a JSDoc header.
   - `@param` for all arguments.
   - `@returns` for return values.
   - Brief description of the purpose.
2. **File Headers**: Each JavaScript file should start with a summary of its responsibility.
3. **Meaningful Comments**: Explain the "why" behind complex logic, not the "what". Avoid commenting obvious code.
