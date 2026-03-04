---
name: autonomous-agent-patterns
description: "Design standards for building autonomous agents: tool design, safety, and background loops."
activation_mode: model_decision
---

# Autonomous Agent Patterns

Use this rule when building or interacting as an autonomous system that uses tools and makes decisions in a loop.

## The Agent Loop (Think-Decide-Act-Observe)
1. **Think**: Analyze the task and history to reason about the next step.
2. **Decide**: Choose the best tool or action to take.
3. **Act**: Execute the chosen action.
4. **Observe**: Capture the result and refine the mental state for the next turn.

## Tool Design & Safety
- **Schema-First**: All tools must have strict JSON schemas and clear descriptions.
- **Permission Levels**: Categorize tools by risk (AUTO, ASK_ONCE, ASK_EACH, NEVER).
- **Sandboxing**: Run untrusted code or commands in isolated environments (containers/VMs).
- **Edit Reliability**: Use search/replace patterns with conflict detection for file edits.

## Context & State
- **Context Management**: Dynamically inject relevant snippets (files, URLs, terminal logs).
- **Checkpointing**: Enable saving and resuming long-running agent tasks.
- **Human-in-the-Loop**: Provide clear UI for approvals and progress monitoring.
