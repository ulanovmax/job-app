import { graphql } from "@/apollo/generated";

export const CREATE_RESPONSE = graphql(`
	mutation CreateResponse($jobId: ID!, $text: String!) {
		addResponse(jobId: $jobId, text: $text) {
			id
			dateCreated
			message

			company {
				name
				id
			}
			job {
				title
				id
				dateCreated
				description
			}
		}
	}
`);
