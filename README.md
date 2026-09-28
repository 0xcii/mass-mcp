# Mass MCP

Public integration examples for building agents on top of **Mass Intelligence**.

Mass helps people and agents turn market research into an auditable workflow: discover a signal, inspect the evidence and caveats, and decide what to monitor next. This repository contains only public documentation, sample clients, and agent skills. It deliberately does **not** contain the Mass application, data pipeline, infrastructure, private APIs, or any credentials.

> This is research tooling, not investment advice. Market data can be delayed, incomplete, or wrong. Never treat an agent response as a guarantee of returns.

## What you can build

- **Research agents** that retrieve curated signals, macro context, capital activity, and narrative changes.
- **Paid data tools** using the HTTP `402 Payment Required` pattern (x402), where the agent inspects payment terms before authorizing a retry.
- **MCP clients** that expose intelligence capabilities as tools in an agent runtime.
- **Human-in-the-loop workflows** that preserve spending limits and show the source timestamp, evidence, and limitations in every answer.

## Repository map

| Path | Purpose |
| --- | --- |
| [`docs/quickstart.md`](docs/quickstart.md) | REST and MCP connection guide |
| [`docs/x402.md`](docs/x402.md) | x402 payment lifecycle and safety model |
| [`examples/api`](examples/api) | Minimal JavaScript REST examples |
| [`examples/mcp`](examples/mcp) | Example MCP client configuration |
| [`skills/mass-intelligence`](skills/mass-intelligence) | Portable agent skill template |

## Quick start

1. Copy the environment template and provide your own endpoint values:

   ```bash
   cp .env.example .env
   ```

2. Run the unauthenticated catalog request:

   ```bash
   node --env-file=.env examples/api/catalog.mjs
   ```

3. Review the available products, prices, network, asset, and recipient before permitting a paid request. See the [x402 guide](docs/x402.md).

4. Configure your MCP client using [`examples/mcp/mcp.json`](examples/mcp/mcp.json). Replace only the placeholder URL; do not put a private key in the configuration.

## Core product principles

Mass is designed around a few simple ideas:

- **Evidence before conclusions.** An intelligence item should retain its timestamp, supporting facts, counter-evidence, and known gaps.
- **Freshness is visible.** A snapshot is labelled as observed research, not live execution guidance.
- **Payments are explicit.** A client must verify the x402 request's chain, token, amount, timeout, and receiver before it pays.
- **Keys stay local.** Wallet signing happens in a user-controlled wallet or secure client environment; never in prompts, MCP tool arguments, repository files, or logs.
- **Private work remains private.** Account-specific reports use a normal authorization header over HTTPS and must never send an API key as a tool parameter.

## x402 example use cases

### 1. Pay-per-query research briefing

An analyst asks an agent for a market briefing. The client loads the public catalog, shows the per-call price, obtains explicit approval up to a defined cap, then calls the protected resource. If the resource responds with `402`, an x402-compatible signer validates the payment requirements and retries with the payment proof.

### 2. MCP tool with a budget guard

An MCP-enabled desktop agent exposes a `capital_radar` tool. Before calling it, a local policy checks that the requested amount fits the session budget and that the expected network and recipient match the catalog. The policy records the approved amount locally; the tool never receives wallet secrets.

### 3. Scheduled research, never unattended spending

An agent can schedule a catalog refresh or a free status check. A paid research run should require a pre-approved, bounded allowance and should stop when that allowance is exhausted. It should report the snapshot time and research limitations rather than generate autonomous trading actions.

Read the full request/response sequence in [`docs/x402.md`](docs/x402.md).

## Security

Please read [`SECURITY.md`](SECURITY.md) before running examples. In particular:

- `.env` is ignored and must remain local.
- The supplied values are intentionally non-routable placeholders.
- Do not commit private keys, seed phrases, API keys, production URLs, payment recipients, customer data, or internal service details.

## Status

The examples describe integration patterns and are intentionally provider-neutral. Replace `https://api.example.mass` with an endpoint you control or one supplied through an authorized Mass integration. Interface names, routes, and pricing are illustrative and may evolve.

## License

MIT — see [`LICENSE`](LICENSE).
