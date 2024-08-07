import { graphql } from "@/apollo/generated";

export const GET_CANDIDATE = graphql(`
	query GetCandidate($id: ID!) {
		candidate(id: $id) {
			name
			experience
			email
			englishLevel
			id
			years
			savedJobs {
				items {
					id
					title
					dateCreated
					description
					type
					responses
					country

					requirements {
						englishLevel
						years
					}

					company {
						name
						id
					}
				}

				totalCount
			}
		}
	}
`);
