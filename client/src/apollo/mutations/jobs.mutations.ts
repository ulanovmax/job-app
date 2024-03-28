import gql from "graphql-tag";

export const CREATE_JOBS = gql`
	mutation CreateJob($input: JobCreateInput!) {
		job: createJob(input: $input) {
			id
			title
		}
	}
`;
