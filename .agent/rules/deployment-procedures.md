---
name: deployment-procedures
description: "Production deployment principles and decision-making for safe releases. Focuses on strategy, verification, and rollback logic."
activation_mode: model_decision
---

# Deployment Procedures

Use this rule to guide safe production deployments, focusing on decision-making, verification, and rollback strategies.

## 1. Platform Selection

Identify the target platform to determine specific procedures:
- **Static/JAMstack**: Vercel, Netlify, Cloudflare Pages (Git push, auto-deploy)
- **Managed Web App**: Railway, Render, Fly.io (Git push or CLI)
- **VPS/Custom**: SSH, PM2, Docker (Manual steps/orchestration)

## 2. Pre-Deployment Principles

Always verify the following before deploying:
- **Code Quality**: Tests passing, linting clean, PR reviewed.
- **Build**: Production build works locally/CI without warnings.
- **Environment**: All environment variables and secrets are configured.
- **Safety**: Database backups completed and rollback plan ready.

## 3. Deployment Workflow

Follow this 5-phase process:
1. **PREPARE**: Verify code, build, and environment.
2. **BACKUP**: Save current state (DB, files) before changing.
3. **DEPLOY**: Execute deployment while monitoring logs.
4. **VERIFY**: Perform health checks and verify key user flows.
5. **CONFIRM or ROLLBACK**: Stabilize or revert immediately if issues arise.

## 4. Verification & Rollback

### Post-Deployment Checks
- **First 5 mins**: Active log monitoring and health endpoint checks.
- **15 mins**: Confirm stability and verify core business logic/flows.

### Rollback Strategy
- **When to Rollback**: Service down, critical functional errors, or >50% performance degradation.
- **Speed over Perfection**: Rollback first to stabilize, debug the root cause later.
- **Communication**: Notify the team immediately of rollback actions.

## 5. Anti-Patterns to Avoid
- ❌ Deploying on Fridays or right before weekends/holidays.
- ❌ Skipping staging or QA environments.
- ❌ Deploying multiple major changes at once.
- ❌ Walking away immediately after deployment without monitoring.

> **Rule of Thumb**: Every deployment is a risk. Minimize risk through preparation and a "test rollback" mindset.
