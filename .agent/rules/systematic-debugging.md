---
name: systematic-debugging
description: "A 4-phase structured framework for identifying and resolving root causes of bugs. Use when fixing reported issues."
activation_mode: model_decision
---

# Systematic Debugging

Use this rule to resolve bugs through a structured investigation rather than "guess-and-check" methods.

## Phase 1: Root Cause Investigation
- **Reproduction**: Create a consistent, minimal reproduction case.
- **Diagnostics**: Gather error messages, logs, stack traces, and data flow info.
- **Trace Back**: Don't just fix where the error appears; find the original trigger.

## Phase 2: Pattern Analysis
- Compare the faulty code with working implementations or documentation.
- Enumerate all differences that could contribute to the issue.

## Phase 3: Hypothesis & Testing
- Use the scientific method: Formulate a hypothesis.
- Design a minimal test to isolate one variable.
- Verify the result and adjust the hypothesis if needed.

## Phase 4: Implementation & Regression
- Fix the issue ONLY after the root cause is confirmed.
- Use a failing test case that now passes to validate the fix.
- Perform regression checks to ensure no new bugs were introduced.

## Critical Constraint
If 3+ consecutive attempts to fix the same bug fail, **STOP** and re-evaluate the architecture or the original assumption.
