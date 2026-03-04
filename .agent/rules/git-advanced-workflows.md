---
name: git-advanced-workflows
description: "Master advanced Git techniques: interactive rebase, cherry-pick, bisect, worktrees, and reflog. Use for clean history and recovery."
activation_mode: model_decision
---

# Git Advanced Workflows

Use this rule to maintain a clean Git history, manage complex branch workflows, and recover from mistakes using advanced Git techniques.

## Core Techniques

### 1. Interactive Rebase (`git rebase -i`)
Clean up commit history before pushing/merging.
- `pick`: Keep as-is.
- `reword`: Change message.
- `edit`: Amend content.
- `squash`/`fixup`: Combine commits.
- `drop`: Remove commit.

### 2. Cherry-Picking (`git cherry-pick`)
Apply specific commits across branches without a full merge.
- `git cherry-pick <hash>`: Single commit.
- `git cherry-pick -n <hash>`: Stage without committing.

### 3. Git Bisect (`git bisect`)
Binary search to find the commit that introduced a bug.
- `git bisect start`, `bad`, `good`.
- `git bisect run <script>`: Automated search.

### 4. Worktrees (`git worktree`)
Work on multiple branches simultaneously without switching context.
- `git worktree add <path> <branch>`: Create new worktree.
- `git worktree remove <path>`: Clean up.

### 5. Reflog (`git reflog`)
The safety net for recovering lost commits or branches.
- `git reflog`: View history of ref movements.
- `git reset --hard <hash>`: Restore deleted state.

## Best Practices & Safety
- **Atomic Commits**: Each commit should be a single logical change.
- **Save Local Changes**: Rebase only local, unpushed commits.
- **Force Safely**: Use `git push --force-with-lease` instead of `--force`.
- **Backup Often**: Create a temporary backup branch before complex rebases.
- **Recovery**: Use `git rebase --abort` or `git merge --abort` to escape failed operations.

> **Note**: Interactive rebase with `--autosquash` and split commits are advanced ways to keep a PR review-ready.
