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
		}
	}
`);
