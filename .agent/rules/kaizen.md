---
name: kaizen
description: "Mindset of continuous improvement. Leave the code better than you found it. Use during refactoring and review."
activation_mode: model_decision
---

# Kaizen (Continuous Improvement)

Use this rule to apply the philosophy of continuous improvement to every interaction with the codebase.

## 1. The Boy Scout Rule
Always leave the code at least slightly better than you found it.
- Fix a nearby typo.
- Improve a confusing variable name.
- Add a missing JSDoc comment.
- Simplify a small piece of overly complex logic.

## 2. Technical Debt Awareness
- Identify and flag "code smells" even if you aren't fixing them immediately.
- Propose small, incremental refactors alongside feature work.
- Keep the code current with modern standards and deprecate legacy patterns where possible.

## 3. Knowledge Sharing
- Document the "Why" behind subtle decisions.
- Create or update project guides when you discover new patterns or pitfalls.
- Ensure transitions and logic are understandable for the next person (or yourself in six months).

## 4. Sustainability
- Prioritize long-term maintainability over quick hacks.
- If a "temporary fix" is necessary, mark it clearly with a `TODO` and a reason.
