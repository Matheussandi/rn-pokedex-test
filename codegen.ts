import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.pokeapi.co/v1beta2",
  documents: ["src/graphql/operations/**/*.graphql"],
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        scalars: {
          jsonb: "@/utils/pokemon-image#SpritesJson",
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
