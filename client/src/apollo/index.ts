import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	split,
} from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind, OperationTypeNode } from "graphql/language";
import { createClient } from "graphql-ws";

const graphqlURL = "http://localhost:9000/graphql";

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: graphqlURL,
	credentials: "include",
});

// WS connection
const wsLink = new GraphQLWsLink(
	createClient({
		url: "ws://localhost:9000/graphql",
	})
);

// Cache implementation
const cache = new InMemoryCache();

function isSubscription(operation) {
	const definition = getMainDefinition(operation.query);
	return (
		definition.kind === Kind.OPERATION_DEFINITION &&
		definition.operation === OperationTypeNode.SUBSCRIPTION
	);
}

// Create the apollo client
const apolloClient = new ApolloClient({
	link: split(isSubscription, wsLink, httpLink),
	cache,
});

export { apolloClient, graphqlURL };
