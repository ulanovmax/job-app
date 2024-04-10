import gql from "graphql-tag";

export const CREATE_COMPANY = gql`
	mutation CreateCompany($input: CompanyCreateInput!) {
		createCompany(input: $input) {
			id
			name
		}
	}
`;
