import { graphql } from "@/apollo/generated";

export const SUBSCRIBE_RESPONSES = graphql(`
	subscription SubscribeResponse {
		responseAdded {
			id
			dateCreated
			message

			candidate {
				name
				id
				email
			}

			company {
				id
				name
			}

			job {
				title
				id
			}
		}
	}
`);
