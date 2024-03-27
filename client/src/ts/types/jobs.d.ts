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

interface JobRequirements {
	years: number;
	englishLevel: string;
}

type JobType = "Remote" | "Office";

export type { Job, JobType };
