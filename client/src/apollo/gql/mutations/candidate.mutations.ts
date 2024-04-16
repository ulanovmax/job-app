import { graphql } from "@/apollo/generated";

export const CREATE_CANDIDATE = graphql(`
	mutation CreateCandidate($input: CandidateCreateInput!) {
		candidate: createCandidate(input: $input) {
			id
			name
			email
		}
	}
`);
