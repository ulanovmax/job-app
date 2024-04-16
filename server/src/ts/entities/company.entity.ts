export interface CompanyEntity {
    id: string,
    dateCreated: string,
    name: string,
    email: string,
    country: string,
    employees: number,
    password: string,
    description?: string
}