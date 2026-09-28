# Integration quick start

This guide uses placeholder URLs and names. It is safe to copy into a public tutorial, but it cannot access a production service until you replace the base URL with an authorized integration endpoint.

## REST discovery

Start by requesting a public catalog. A catalog should tell the client which resources exist and, for paid resources, the expected pricing and settlement information.

```bash
node --env-file=.env examples/api/catalog.mjs
```

The example performs a `GET /v1/agent/catalog` request. It deliberately sends no credentials.

## A paid REST call

Use `examples/api/paid-request.mjs` to see the safe control flow. It first makes an ordinary request. If it receives `402 Payment Required`, it prints the challenge and exits; it does not attempt to sign or retry automatically.

Connect an audited x402-compatible client or wallet only after your application has:

1. shown the user the price and requested resource;
2. received a specific spending approval;
3. verified the payment requirements against its policy; and
4. restricted the signer to the selected network, asset, recipient, and amount.

## MCP connection

The `examples/mcp/mcp.json` file is a configuration shape commonly supported by MCP clients. Point its URL at an authorized Streamable HTTP server. Keep authentication and signing inside the client environment — never add a wallet secret to the JSON file or a tool argument.

After connection, tools may be named along these lines:

- `curated` — research signals with timestamps and caveats.
- `macro_daily` — macro context for a requested locale.
- `capital_radar` — capital and market-activity snapshot.
- `narrative_horizon` — attention and narrative changes.
- `airdrop_opportunities` — observed opportunities, not a promise of eligibility.

Your implementation should present the tool description, input, data timestamp, and limitations to users.
