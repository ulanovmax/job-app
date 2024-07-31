import { JobList} from "../../generated/shema.js";

export interface CandidateEntity {
    id: string,
    name: string,
    email: string,
    years: number,
    englishLevel: string,
    password: string,
    experience: string,
    savedJobs: JobList
}