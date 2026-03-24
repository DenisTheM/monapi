import { defineConfig } from "tsup";

const esmRequireShim = "import { createRequire } from 'module'; const require = createRequire(import.meta.url);";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
      next: "src/next.ts",
      mcp: "src/mcp.ts",
    },
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: true,
    outDir: "dist",
    banner: { js: esmRequireShim },
  },
  {
    entry: {
      index: "src/index.ts",
      next: "src/next.ts",
      mcp: "src/mcp.ts",
    },
    format: ["cjs"],
    sourcemap: true,
    splitting: true,
    outDir: "dist",
  },
  {
    entry: {
      "cli/index": "cli/index.ts",
    },
    format: ["esm"],
    banner: { js: "#!/usr/bin/env node" },
    outDir: "dist",
  },
]);
