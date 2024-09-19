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

			company {
				id
				name
				email
			}
		}
	}
`);

export const GET_RESPONSE = graphql(`
	query GetResponse($responseId: ID!) {
		response(id: $responseId) {
			id
			dateCreated
			message

			job {
				id
				title
				country
				responses
				dateCreated
				requirements {
					englishLevel
					years
				}
				type
			}

			candidate {
				email
				name
				id
				years
				experience
				englishLevel
			}

			company {
				id
				name
				email
				employees
				dateCreated
				country
			}
		}
	}
`);
