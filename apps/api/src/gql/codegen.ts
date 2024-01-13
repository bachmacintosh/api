import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://api.cloudflare.com/client/v4/graphql": {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_GQL_TOKEN}`,
        },
      },
    },
  ],
  documents: "./src/gql/queries.gql",
  emitLegacyCommonJSImports: false,
  generates: {
    "./src/types/cloudflare/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        avoidOptionals: true,
        emitLegacyCommonJSImports: false,
        useTypeImports: true,
        defaultScalarType: "unknown",
        scalars: {
          Date: "string",
          Time: "string",
          bool: "boolean",
          float32: "number",
          float64: "number",
          int8: "number",
          int16: "number",
          int64: "number",
          string: "string",
          uint8: "number",
          uint16: "number",
          uint32: "number",
          uint64: "number",
        },
      },
    },
  },
};

export default config;
