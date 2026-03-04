---
name: performance-optimization
description: "Core principles for analyzing and improving application performance across the stack."
activation_mode: model_decision
---

# Performance Optimization Principles

Use this rule when profiling, debugging, or optimizing application performance (Backend, Frontend, or Database).

## Optimization Workflow
1. **Measure**: Establish a baseline with metrics and traces.
2. **Profile**: Identify the exact bottleneck (CPU, Memory, I/O, Network).
3. **Hypothesize**: Formulate why the bottleneck exists.
4. **Optimize**: Apply the most impactful targeted fix.
5. **Verify**: Re-measure to confirm the improvement.

## Benchmarking & Metrics
- **Quantifiable Goals**: Define targets (e.g., "Reduce P95 latency by 200ms").
- **Core Web Vitals**: Focus on LCP, FID, and CLS for frontend performance.
- **Latency Buckets**: Analyze performance by percentiles (P50, P95, P99), not just averages.

## Technical Strategies
- **Caching**: Implement appropriate caching layers (CDN, Redis, Browser).
- **Parallelism**: Use async operations and concurrency to prevent blocking.
- **Resource Efficiency**: Minimize payload sizes, optimize images, and prune dependencies.
- **Database**: Tune indexes, optimize queries, and use connection pooling.

## ❌ Anti-Patterns
- ❌ **Premature Optimization**: Optimizing without measurement data.
- ❌ **Guesswork**: Changing code randomly hoping for performance gains.
- ❌ **Ignoring Edge Cases**: Benchmarking only the "happy path" or small datasets.
