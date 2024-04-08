import { Company } from "./company";

interface Job {
	id: string;
	companyId: number;
	responses: number;
	dateCreated: string;
	title: string;
	country: string;
	requirements: JobRequirements;
	description?: string;
	type: JobType;
}

interface JobList {
	items: Job[];
	totalCount: number;
}

interface JobRequirements {
	years: number;
	englishLevel: string;
}

type JobType = "Remote" | "Office";

export type { Job, JobList, JobType };
