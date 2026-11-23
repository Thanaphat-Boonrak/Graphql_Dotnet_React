import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql",
  documents: "./src/graphql/**/*.{gql,graphql}",
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generate/schema.ts": {
      plugins: ["typescript"],
      config: {
        enumsAsTypes: true,
        useTypeImports: true,
      },
    },
    "./src/graphql/generate/operations.ts": {
      plugins: ["typescript-operations", "typed-document-node"],
      config: {
        enumsAsTypes: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
