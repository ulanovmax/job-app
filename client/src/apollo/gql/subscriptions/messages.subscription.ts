import { graphql } from "@/apollo/generated";

export const SUBSCRIBE_MESSAGES = graphql(`
	subscription SubscribeMessages {
		messageAdded {
			content
			dateCreated
			id
			receiverId
			senderId
		}
	}
`);
