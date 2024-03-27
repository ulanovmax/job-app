import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client/core";

const graphqlURL = "http://localhost:9000/graphql";

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: graphqlURL,
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});

export { apolloClient, graphqlURL };
