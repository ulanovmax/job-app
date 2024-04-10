export interface Company {
	id: string;
	name: string;
	description?: string;
}

export interface CreateCompanyInput {
	name: string;
	email: string;
	country: string;
	password: string;
	employees: number;
	description: string;
}
