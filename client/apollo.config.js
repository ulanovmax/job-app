export default {
	client: {
		service: {
			name: "job-app",
			// URL to the GraphQL API
			url: "http://localhost:9000/graphql",
		},
		// Files processed by the extension
		includes: ["src/**/*.vue", "src/**/*.ts", "src/**/*.s"],
	},
};
