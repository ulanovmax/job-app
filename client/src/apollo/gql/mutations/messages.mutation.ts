import { graphql } from "@/apollo/generated";

export const ADD_MESSAGE = graphql(`
	mutation AddMessage($senderId: ID!, $receiverId: ID!, $content: String!) {
		messages: addMessage(
			senderId: $senderId
			receiverId: $receiverId
			content: $content
		) {
			content
			dateCreated
			id
			senderId
			receiverId
		}
	}
`);
