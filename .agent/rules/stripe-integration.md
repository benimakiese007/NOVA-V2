---
name: stripe-integration
description: "Standards for implementing robust, PCI-compliant payment flows with Stripe (Checkout, Subscriptions, Webhooks)."
activation_mode: model_decision
---

# Stripe Integration Standards

Use this rule when implementing or maintaining payment processing and subscription systems.

## Core Implementation
- **Stripe Checkout**: Use for hosted, easy-to-maintain flows (PCI compliant).
- **Payment Intents**: Use for custom, highly-integrated UIs via Stripe.js.
- **Subscription Management**: Track Customer, Product, and Price lifecycles accurately.

## Webhook Security
- **Mandatory Webhooks**: Never rely solely on client-side success redirects.
- **Signature Verification**: Always verify webhook signatures to prevent spoofing.
- **Idempotency**: Ensure webhook handlers can process the same event multiple times safely.

## Reliability & UX
- **Error Handling**: Gracefully handle card declines, SCA challenges, and network issues.
- **Metadata**: Attach internal IDs (Order ID, User ID) to Stripe objects for easy reconciliation.
- **Test Mode**: Exhaustively test using Stripe's test card numbers before going live.

## Best Practices
- **Smallest Unit**: Always work in the smallest currency unit (e.g., cents).
- **Customer Portal**: Use Stripe's hosted Billing Portal for user subscription management.
- **PCI Safety**: Never handle or store raw card data on your server.
