export interface Token {
    id: string,
    email: string,
    name: string,
    role: "candidate" | "company"
}