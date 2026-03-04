---
name: find-bugs
description: "Find bugs, security vulnerabilities, and code quality issues in local branch changes. Use when asked to review changes, find bugs, security review, or audit code on the current branch."
activation_mode: model_decision
---

# Find Bugs

Use this rule to review changes on a branch for bugs, security vulnerabilities, and code quality issues.

## 1. Input Gathering (Preparation)
- Get the FULL diff: `git diff $(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name')...HEAD`
- If truncated, read each changed file individually.
- List all modified files before proceeding.

## 2. Attack Surface Mapping
For each changed file, identify:
- **User Inputs**: Request params, headers, body, URL components.
- **Data Operations**: Database queries, session/state operations.
- **Security**: Auth checks, external calls, cryptographic operations.

## 3. Security Checklist
Verify every item for every modified file:
- [ ] **Injection**: SQL, command, template, header injection.
- [ ] **XSS**: Proper escaping in templates/outputs.
- [ ] **Auth/Z**: Authentication and Authorization (IDOR) checks on all protected paths.
- [ ] **CSRF**: Protection on state-changing operations.
- [ ] **Concurrency**: Race conditions (TOCTOU) in read-then-write patterns.
- [ ] **Secrets & Crypto**: Secure algorithms, no secrets in logs, secure random usage.
- [ ] **Disclosure & DoS**: Error message info leaks, resource exhaustion (missing limits).
- [ ] **Business Logic**: Edge cases, numeric overflow, state machine violations.

## 4. Verification Workflow
- Cross-check if issues are handled elsewhere in the code.
- Search for existing tests covering the scenario.
- Read surrounding context to confirm the validity of the issue.

## 5. Output Format
**Priority**: Security vulnerabilities > Bugs > Code Quality (skip stylistic/formatting issues).

For each issue found, provide:
- **File:Line**: Brief description.
- **Severity**: Critical/High/Medium/Low.
- **Problem & Evidence**: Why it is a real issue.
- **Fix**: Concrete suggestion.
- **References**: OWASP, RFCs, etc.

*If no significant issues are found, state it clearly.*
