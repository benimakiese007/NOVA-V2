---
name: git-pushing
description: "Ensure safe and clean Git operations. Focuses on small commits, up-to-date branches, and safe pushing."
activation_mode: model_decision
---

# Git Pushing (Safe Workflow)

Use this rule to manage remote synchronization safely, protecting the main branches and maintaining a clean collaborative history.

## 1. Pre-Push Verification
- **Stay Up-to-Date**: Always `git pull --rebase` before pushing to integrate remote changes.
- **Small Commits**: Ensure commits are atomic and focused on a single logical change.
- **Tests**: Verify that everything builds and tests pass locally before pushing.

## 2. Safe Push Practices
- **Feature Branches**: Always work on a dedicated branch; never push directly to `main` or `master`.
- **Force with Lease**: If force-pushing is necessary (e.g., after a rebase), use `--force-with-lease` instead of `--force` to avoid overwriting others' work.

## 3. Pull Request (PR) Workflow
- Use PRs for all mergers into the primary branch.
- Include a clear description of the "What" and "Why" in the PR.
- Wait for automated checks (CI) and peer review where applicable.

## 4. Cleanup
- Delete local and remote branches after they are successfully merged and confirmed.
