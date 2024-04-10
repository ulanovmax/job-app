import gql from "graphql-tag";

export const CREATE_COMPANY = gql`
	mutation CreateCompany($input: CompanyCreateInput!) {
		company: createCompany(input: $input) {
			id
			name
		}
	}
`;
