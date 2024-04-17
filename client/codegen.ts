import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "../server/src/schemas/schema.graphql",
	documents: ["src/apollo/gql/**/*.ts"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"./src/apollo/generated/": {
			preset: "client",
			config: {
				useTypeImports: true,
				skipTypename: true,
			},
		},
	},
};

export default config;
