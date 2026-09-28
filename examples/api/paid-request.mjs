const baseUrl = process.env.MASS_API_BASE_URL;

if (!baseUrl) {
  throw new Error("Set MASS_API_BASE_URL in .env (see .env.example).");
}

const resource = new URL("/v1/agent/capital", baseUrl);
const response = await fetch(resource, { headers: { Accept: "application/json" } });

if (response.status === 402) {
  const requirement = await response.text();
  console.error("Payment is required before this resource can be accessed.");
  console.error("Inspect and validate this response with an x402-compatible client:");
  console.error(requirement);
  console.error("No payment was signed. See docs/x402.md for the safe retry flow.");
  process.exitCode = 2;
} else if (!response.ok) {
  throw new Error(`Request failed: ${response.status} ${response.statusText}`);
} else {
  console.log(JSON.stringify(await response.json(), null, 2));
}
