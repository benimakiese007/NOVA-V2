---
name: prompt-engineering-patterns
description: "Advanced techniques to maximize LLM performance: few-shot, CoT, and systematic prompt optimization."
activation_mode: model_decision
---

# Prompt Engineering Patterns

Use this rule when designing, optimizing, or debugging prompts for production.

## Core Techniques
- **Few-Shot**: Provide 2-5 clear input-output demonstrations to steer behavior.
- **Chain-of-Thought (CoT)**: Force reasoning with "Let's think step by step" (Zero-shot) or reasoning traces (Few-shot).
- **Progressive Disclosure**: Start simple; add complexity only as needed.
- **Structured Outputs**: Use JSON or Markdown blocks to ensure predictable parsing.

## Prompt Architecture
- **Instruction Hierarchy**: [System Context] → [Task] → [Examples] → [Input] → [Output Format].
- **Variable Injection**: Design reusable templates with clear placeholders (`{text}`, `{style}`).
- **Model Role**: Establish clear expertise and constraints in the system message.

## Optimization & Testing
- **Iteration**: Treat prompts as code; use versioning and A/B testing.
- **Token Efficiency**: Remove redundant words; use system prompts for invariant instructions.
- **Self-Verification**: Add a final step for the model to check its output against requirements.
