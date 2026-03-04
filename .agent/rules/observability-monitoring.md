---
name: observability-monitoring
description: "Three pillars of observability: metrics, logs, and traces. SLO/SLI management and alerting strategies."
activation_mode: model_decision
---

# Observability & Monitoring Standards

Use this rule when setting up or improving system visibility, health tracking, and performance monitoring.

## The Three Pillars
- **Metrics**: Quantitative data (CPU, Memory, Request Rate, Error Rate). Use for dashboards and alerting.
- **Logs**: Discrete events with context. Use for debugging and auditing. Implement structured logging (e.g., JSON).
- **Traces**: End-to-end request lifecycle across services. Use for identifying latency bottlenecks in distributed systems.

## Monitoring Goals
- **Full Visibility**: Ensure every critical path is instrumented.
- **Actionable Insights**: Dashboards should answer "Is it working?" and "Why is it slow?".
- **Alerting Strategy**: Alerts should be symptom-based (e.g., "5xx errors up") rather than cause-based (e.g., "CPU high"). Avoid alert fatigue.

## Reliability Engineering (SRE)
- **SLIs (Indicators)**: Specific metrics (e.g., Latency, Availability).
- **SLOs (Objectives)**: Target values for SLIs (e.g., 99.9% availability).
- **Error Budgets**: The allowed unreliability before focusing strictly on stability.

## Best Practices
- **Standardize**: Use consistent labels and namespaces across all telemetry.
- **Automate**: Integrate monitoring setup into CI/CD and Infrastructure as Code.
- **Trace Context**: Always propagate trace headers (e.g., W3C Trace Context) across service boundaries.
