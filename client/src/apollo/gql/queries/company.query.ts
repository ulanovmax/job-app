import { graphql } from "@/apollo/generated";

export const GET_COMPANY = graphql(`
	query GetCompany($companyId: ID!, $jobsLimit: Int) {
		company(id: $companyId) {
			id
			email
			name
			country
			dateCreated
			description
			employees
			jobs(limit: $jobsLimit) {
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
					}
				}

				totalCount
			}
		}
	}
`);
