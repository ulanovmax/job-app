import { graphql } from "@/apollo/generated";

export const GET_RESPONSES = graphql(`
	query GetResponses {
		responses {
			id
			dateCreated
			message

			job {
				title
				id
			}

			candidate {
				id
				name
				email
			}
		}
	}
`);
