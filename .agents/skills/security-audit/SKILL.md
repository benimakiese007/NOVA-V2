---
name: security-audit
description: Scans code changes for potential security vulnerabilities like XSS, injections, and insecure data handling.
---

# Security Audit Skill

Always prioritize security when reviewing or writing code.

## Security Checklist

1. **Input Sanitization**: Ensure all user inputs are sanitized before being used in DOM manipulation or API calls.
2. **XSS Prevention**: Avoid `innerHTML` where `textContent` or `innerText` can be used. Use safe templating.
3. **Sensitive Data**: Never hardcode API keys, passwords, or PII (Personally Identifiable Information).
4. **Authentication/Authorization**: Verify that sensitive actions require proper checks.
5. **Secure API Calls**: Use HTTPS and validate responses.

## Feedback Style

- Clearly mark security risks as **[SECURITY CRITICAL]**.
- Provide a brief explanation of the potential exploit.
- Suggest a secure implementation.
