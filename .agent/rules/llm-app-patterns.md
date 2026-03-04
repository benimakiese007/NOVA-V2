---
name: llm-app-patterns
description: "Patterns for building production LLM apps: RAG pipelines, agent loops, and evaluation frameworks."
activation_mode: model_decision
---

# LLM Application Patterns

Use this rule when designing and building applications powered by Large Language Models.

## RAG Pipeline (Retrieval-Augmented Generation)
- **Ingestion**: Use recursive or semantic chunking (typical chunk size: 512 tokens with 50 overlap).
- **Retrieval**: Implement hybrid search (semantic vector search + keyword BM25).
- **Generation**: Ground responses strictly in the provided context and include citations.

## Agent Architectures
- **ReAct (Reason/Act)**: Use for step-by-step tool use and reasoning.
- **Function Calling**: Leverage native model tool-calling capabilities for a leaner loop.
- **Plan-and-Execute**: For complex, multi-step tasks requiring a structured roadmap.
- **Multi-Agent**: Orchestrate specialized agents (Researcher, Analyst, Critic) for high-stakes tasks.

## LLMOps & Production
- **Observability**: Track latency, token usage, and cost per request.
- **Evaluation**: Implement groundedness and accuracy checks on model outputs.
- **Caching**: Use deterministic caching (temperature=0) to save cost and time.
- **Fallbacks**: Use a tiered model strategy (e.g., GPT-4 -> GPT-3.5) for reliability.
