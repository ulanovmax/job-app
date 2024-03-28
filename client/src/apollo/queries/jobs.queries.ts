import gql from "graphql-tag";

export const GET_JOBS = gql`
	query getJobs {
		jobs {
			title
			id
			country
			responses
			type
			description
			dateCreated

			requirements {
				years
				englishLevel
			}

			company {
				name
			}
		}
	}
`;

export const GET_CURRENT_JOB = gql`
	query GetJob($id: ID!) {
		job(id: $id) {
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
			}
		}
	}
`;
