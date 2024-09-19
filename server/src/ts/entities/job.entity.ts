export interface JobEntity {
    id: string,
    companyId: string,
    title: string,
    dateCreated: string,
    type: JobType,
    country: string,
    responses: string | string[],
    requirements: JobRequirements | string,
    description?: string
}

export interface JobRequirements {
    years: number;
    englishLevel: string;
}

export interface ResponseEntity {
    id: string;
    dateCreated: string;
    jobId: string;
    companyId: string;
    candidateId: string;
    message: string;
}

export interface JobList {
    items: JobEntity[];
    totalCount: number
}

export enum JobType {
    Office = "Office",
    Remote = "Remote"
}