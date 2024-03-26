import { Company } from "./company";

interface Job {
	id: string;
	company: Company;
	responses: number;
	date: Date;
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

type JobType = "remote" | "office";

export type { Job };
