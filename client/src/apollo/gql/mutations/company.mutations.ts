import { graphql } from "@/apollo/generated";

export const CREATE_COMPANY = graphql(`
	mutation CreateCompany($input: CompanyCreateInput!) {
		company: createCompany(input: $input) {
			id
			name
		}
	}
`);
