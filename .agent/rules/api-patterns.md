---
name: api-patterns
description: "Principles for designing high-quality REST, GraphQL, and tRPC APIs. Covers naming, responses, and versioning."
activation_mode: model_decision
---

# API Design Patterns

Use this rule when designing or modifying API endpoints and contracts.

## Selective Strategy
- **REST**: Best for public/third-party consumption and standard resources.
- **GraphQL**: Best for complex, relational data and flexible frontend requirements.
- **tRPC**: Best for TypeScript-only monorepos where type safety is the priority.

## Design Rules
- **Resource Naming**: Use nouns for collections (`/users`, not `/getUsers`).
- **Standard Methods**: strictly follow HTTP verbs (GET, POST, PUT, DELETE, PATCH).
- **Consistent Responses**: Use a unified envelope pattern for success and error objects.
- **Pagination**: Always plan for list pagination (Cursor or Offset based).

## Security & Reliability
- **Versioning**: Always plan for API evolution (URI, Header, or Query versioning).
- **Rate Limiting**: Protect endpoints from abuse using sliding windows or token buckets.
- **Documentation**: Maintain up-to-date OpenAPI (Swagger) or GraphQL schemas.
- **Auth Patterns**: Implement appropriate mechanisms (JWT, OAuth, API Keys).

## ❌ Anti-Patterns
- ❌ Verbs in REST endpoints.
- ❌ Inconsistent error response formats.
- ❌ Exposing internal stack traces to clients.
- ❌ Skipping authentication for sensitive resources.
