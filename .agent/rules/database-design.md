---
name: database-design
description: "Schema design, normalization, indexing strategies, and ORM selection principles."
activation_mode: model_decision
---

# Database Design & Optimization

Use this rule when designing schemas, writing migrations, or optimizing queries.

## Design Philosophy
- **Selective Normalization**: Balance normalization for integrity and denormalization for performance.
- **Primary Keys**: Use appropriate types (UUIDs for distributed systems, Integers for simple ones).
- **Relationships**: Explicitly define and enforce Foreign Key constraints.

## Indexing Strategy
- **Selective Indexing**: Index columns used in WHERE, JOIN, and ORDER BY clauses.
- **Avoid Over-Indexing**: Indexes impact write performance; use them judiciously.
- **Composite Indexes**: Use for queries filtering on multiple columns (order matters).

## Optimization
- **N+1 Prevention**: Always use eager loading or efficient JOINs.
- **Examine Plans**: Use `EXPLAIN ANALYZE` to identify slow query paths.
- **Transaction Safety**: Wrap multi-step data changes in transactions to ensure atomicity.

## ❌ Anti-Patterns
- ❌ Using `SELECT *` in production code.
- ❌ Storing large JSON blobs when structured data is predictable.
- ❌ Skipping indexes for high-traffic tables.
- ❌ Ignoring database-level constraints (Unique, Not Null).
