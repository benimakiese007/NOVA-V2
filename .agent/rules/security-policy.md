---
name: Security Policy
description: Prioritize security, input sanitization, and XSS prevention.
activation: Always On
---

# Security Policy

Prioritize security in every line of code to protect user data and maintain platform integrity.

## Critical Checks
1. **XSS Prevention**: 
   - Never use `innerHTML` with user-supplied data. Use `textContent` or `innerText`.
   - Sanitize any data rendered in the DOM.
2. **Input Validation**: All data coming from users or APIs must be validated and sanitized before use.
3. **No Secrets**: Never commit or hardcode API keys, passwords, or sensitive environment variables.
4. **API Safety**: Use secure protocols (HTTPS) and implement proper error handling for all network requests.

## Feedback
If a security risk is identified, mark it as **[SECURITY CRITICAL]** and provide an immediate fix.
