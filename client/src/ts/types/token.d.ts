export interface Token {
	id: string;
	email: string;
	role: Roles;
	name: string;
}

export type Roles = "candidate" | "company";
