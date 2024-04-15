export interface JobEntity {
    id: number,
    companyId: number,
    title: string,
    dateCreated: string,
    type: JobType,
    country: string,
    responses: number,
    requirements: JobRequirements,
    description?: string
}

export interface JobRequirements {
    years: number;
    englishLevel: string;
}

export enum JobType {
    Office,
    Remote
}