export interface Token {
	id: string;
	email: string;
	role: "candidate" | "company";
	name: string;
}
