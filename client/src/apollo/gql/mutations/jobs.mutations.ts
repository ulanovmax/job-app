import { graphql } from "@/apollo/generated";

export const CREATE_JOBS = graphql(`
	mutation CreateJob($input: JobCreateInput!) {
		job: createJob(input: $input) {
			id
			title
		}
	}
`);
