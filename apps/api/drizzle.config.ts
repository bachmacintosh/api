import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/d1.ts",
  out: "./drizzle",
} satisfies Config;
