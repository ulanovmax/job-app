import gql from "graphql-tag";

export const CREATE_CANDIDATE = gql`
	mutation CreateCandidate($input: CandidateCreateInput!) {
		candidate: createCandidate(input: $input) {
			id
			name
			email
		}
	}
`;
