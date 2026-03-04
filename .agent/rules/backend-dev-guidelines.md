---
name: backend-dev-guidelines
description: "Strict standards for production-grade backend services: layered architecture, DI, validation, and error boundaries."
activation_mode: model_decision
---

# Backend Development Guidelines

Use this rule for all backend-related tasks to ensure systems remain predictable, observable, and maintainable.

## Architectural Doctrine
- **Strict Layers**: Routes → Controllers → Services → Repositories → Database.
- **No Layer Skipping**: Each layer has one responsibility; never skip a layer.
- **Routes Only Route**: Contain zero business logic.
- **Controllers Coordinate**: Parse requests and format responses.
- **Services Decide**: Contain all business rules and are framework-agnostic.

## Core Patterns
- **Dependency Injection**: Services receive dependencies via constructors to enable testing/mocking.
- **BaseController**: All controllers extend a base class for consistent success/error handling.
- **Repository Pattern**: Encapsulate all database queries and transactions.

## Safety & Observability
- **Zod Validation**: Validate ALL external inputs (body, query, params).
- **Centralized Config**: Use a unified configuration source; never use `process.env` directly.
- **Error Boundaries**: Wrap async handlers and capture all exceptions in an observability tool (e.g., Sentry).

## Anti-Patterns
- ❌ Business logic in routes or controllers.
- ❌ Direct database access in controllers.
- ❌ Missing input validation.
- ❌ Swallowed or unlogged errors.
