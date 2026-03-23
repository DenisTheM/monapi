import type { MonapiConfig } from "./core/types.js";
import { validateConfig } from "./core/validate.js";
import { resolveBaseConfig, priceToMoney } from "./core/resolver.js";

export type { MonapiConfig, PaymentEvent, OnPaymentCallback } from "./core/types.js";

interface MonapiMcpConfig extends Pick<MonapiConfig, "wallet" | "network" | "token" | "maxTimeoutSeconds" | "facilitatorUrl"> {
  price: number;
}

/**
 * Create an x402 payment wrapper for MCP tool handlers.
 *
 * Returns a function that wraps your tool handler with payment verification.
 *
 * @example
 * ```ts
 * import { monapiMcp } from "@monapi/sdk/mcp";
 *
 * const paid = monapiMcp({
 *   price: 0.01,
 *   wallet: process.env.WALLET!,
 * });
 *
 * server.tool("search", { query: z.string() },
 *   paid(async (args) => ({
 *     content: [{ type: "text", text: "Results..." }]
 *   }))
 * );
 * ```
 */
export function monapiMcp(config: MonapiMcpConfig) {
  validateConfig(config);

  const resolved = resolveBaseConfig(config);

  // Lazy-import x402 packages
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createPaymentWrapper } = require("@x402/mcp");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { x402ResourceServer, HTTPFacilitatorClient } = require("@x402/core/server");

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ExactEvmScheme } = require("@x402/evm/exact/server");

  const facilitator = new HTTPFacilitatorClient({
    url: resolved.facilitatorUrl,
  });
  const server = new x402ResourceServer(facilitator);
  server.register(resolved.networkId, new ExactEvmScheme());

  // Build payment requirements synchronously from config
  const accepts = [
    {
      scheme: "exact",
      network: resolved.networkId,
      asset: resolved.tokenAddress,
      amount: priceToMoney(config.price),
      payTo: resolved.wallet,
      maxTimeoutSeconds: resolved.maxTimeoutSeconds,
      extra: {},
    },
  ];

  return createPaymentWrapper(server, { accepts });
}
