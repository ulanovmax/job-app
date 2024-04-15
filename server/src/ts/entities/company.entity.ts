export interface CompanyEntity {
    id: number,
    dateCreated: string,
    name: string,
    email: string,
    country: string,
    employees: number,
    password: string,
    description?: string
}