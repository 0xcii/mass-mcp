const baseUrl = process.env.MASS_API_BASE_URL;

if (!baseUrl) {
  throw new Error("Set MASS_API_BASE_URL in .env (see .env.example).");
}

const response = await fetch(new URL("/v1/agent/catalog", baseUrl), {
  headers: { Accept: "application/json" }
});

if (!response.ok) {
  throw new Error(`Catalog request failed: ${response.status} ${response.statusText}`);
}

console.log(JSON.stringify(await response.json(), null, 2));
