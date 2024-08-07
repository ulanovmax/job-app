import { graphql } from "@/apollo/generated";

export const CREATE_CANDIDATE = graphql(`
	mutation CreateCandidate($input: CandidateCreateInput!) {
		candidate: createCandidate(input: $input) {
			id
			name
			email
		}
	}
`);

export const SAVE_JOB_FOR_CANDIDATE = graphql(`
	mutation SaveJobForCandidate($candidateId: ID!, $jobId: ID!) {
		jobs: addSavedJob(candidateId: $candidateId, jobId: $jobId)
	}
`);

export const REMOVE_SAVED_JOB_FOR_CANDIDATE = graphql(`
	mutation RemoveSavedJobForCandidate($candidateId: ID!, $jobId: ID!) {
		jobs: removeSavedJob(candidateId: $candidateId, jobId: $jobId)
	}
`);
