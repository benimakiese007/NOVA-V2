---
name: security-auditor
description: "Expert security auditing for DevSecOps, application security, and compliance (GDPR, OWASP, Cloud)."
activation_mode: model_decision
---

# Security Auditor

Use this rule when performing security reviews, risk assessments, or auditing CI/CD pipelines.

## Audit Scope
- **Application Security**: Validating auth, authz, and data protection controls.
- **DevSecOps**: Integrating SAST/DAST/IAST and dependency scanning into pipelines.
- **Supply Chain**: Auditing SBOM, dependency integrity, and build pipeline security.
- **Cloud Security**: Reviewing IAM, network ACLs, and storage configurations (AWS/Azure/GCP).

## Methodologies
- **Threat Modeling**: Using STRIDE or PASTA to identify attack vectors.
- **OWASP ASVS**: Following the Application Security Verification Standard.
- **Shift-Left**: Embedding security checks early in the development lifecycle.

## Critical Checks
- **Auth & Identity**: OAuth 2.0/2.1, OIDC, JWT security, and Multi-Factor Auth.
- **Data Protection**: Encryption at rest/transit and proper key management.
- **Zero Trust**: Implementing "never trust, always verify" principles.

## ❌ Anti-Patterns
- ❌ Running intrusive tests in production without explicit approval.
- ❌ Exposing secrets or PII in audit reports.
- ❌ Relying solely on automated scans without manual verification.
