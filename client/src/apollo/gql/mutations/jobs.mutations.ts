import { graphql } from "@/apollo/generated";

export const CREATE_JOBS = graphql(`
	mutation CreateJob($input: JobCreateInput!) {
		job: createJob(input: $input) {
			id
			title
		}
	}
`);

export const DELETE_JOB = graphql(`
	mutation DeleteJob($id: ID!, $companyId: ID!) {
		job: deleteJob(id: $id, companyId: $companyId) {
			id
			title
		}
	}
`);

export const UPDATE_JOB = graphql(`
	mutation UpdateJob($id: ID!, $companyId: ID!, $input: JobCreateInput!) {
		job: updateJob(id: $id, companyId: $companyId, input: $input) {
			id
			title
			description
			type
			requirements {
				englishLevel
				years
			}
		}
	}
`);
