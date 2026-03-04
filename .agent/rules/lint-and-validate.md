---
name: lint-and-validate
description: "Enforce code quality gates through automated linting, type-checking, and security scanning. Use before finalizing any code changes."
activation_mode: model_decision
---

# Lint and Validate

Use this rule to ensure all code changes meet the project's quality, style, and security standards before submission.

## 1. Static Analysis & Linting
- **Javascript/TypeScript**: Run `eslint` and ensure zero warnings or errors.
- **Python**: Use `ruff` or `flake8` for style and logic checks.
- **Formatting**: Use `prettier` or project-specific formatters to maintain consistency.

## 2. Type-Checking
- Ensure all TypeScript code passes `tsc` validation.
- In Python, use `mypy` for static type verification.
- Never use `any` (TS) or bypass type checks without a documented reason.

## 3. Security Scanning
- Run `npm audit` or equivalent for dependency vulnerabilities.
- Use tools like `bandit` (Python) or generic secrets detectors to scan for sensitive information.

## 4. Quality Loop
- No code should be finalized until all linting and validation steps pass.
- Fix all auto-fixable issues immediately.
- Block submission if audit or type-checks fail.
