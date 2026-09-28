# Security policy

This repository is intentionally safe to publish. It contains no production configuration or signing material.

## Never commit

- Wallet private keys, seed phrases, or exported key files.
- API keys, session tokens, webhook secrets, or database URLs.
- Production service endpoints, payment recipient addresses, customer data, or internal architecture details.
- `402` payment proofs or HTTP request logs that may contain them.

## Using x402 safely

Before a client signs any payment, verify the requested network, asset, atomic amount, recipient, resource, and expiry/timeout. Ask the user for an explicit spend cap. Keep the signer in a user-controlled wallet or secure runtime; it must not be driven by text from an untrusted tool response.

## Reporting a vulnerability

Do not open a public issue for a potential security vulnerability. Contact the repository owner privately through GitHub instead. Do not include secrets in the report.
