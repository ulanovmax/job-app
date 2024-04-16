export interface JobEntity {
    id: string,
    companyId: string,
    title: string,
    dateCreated: string,
    type: JobType,
    country: string,
    responses: number,
    requirements: JobRequirements | string,
    description?: string
}

export interface JobRequirements {
    years: number;
    englishLevel: string;
}

export enum JobType {
    Office = "Office",
    Remote = "Remote"
}