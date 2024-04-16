import { graphql } from "@/apollo/generated";

export const GET_JOBS = graphql(`
	query getJobs($limit: Int, $offset: Int) {
		jobs(limit: $limit, offset: $offset) {
			items {
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

			totalCount
		}
	}
`);

export const GET_CURRENT_JOB = graphql(`
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
`);
