import type { Job } from "@/ts/types/jobs";

export interface Company {
	id: string;
	dateCreated: string;
	name: string;
	description?: string;
	country: string;
	jobs: Job[];
	employees: number;
}

export interface CreateCompanyInput {
	name: string;
	email: string;
	country: string;
	password: string;
	employees: number;
	description?: string;
}
