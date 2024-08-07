import { connection } from './connection.js';
import {generateId} from "./ids.js";
import {CandidateEntity} from "../ts/entities/candidate.entity.js";
import {
    CandidateCreateInput,
    JobList,
    MutationAddSavedJobArgs, MutationRemoveSavedJobArgs
} from "../generated/shema.js";
import {candidateNotFoundError, jobNotFoundError} from "../errors.js";
import {getJob, getJobs} from "./jobs.js";
import {JobEntity} from "../ts/entities/job.entity.js";

const getCandidateTable = () => connection.table<CandidateEntity>('candidate');

const checkJobAndCompany = async (candidateId: CandidateEntity['id'], jobId: JobEntity['id']) => {
    const candidate = await getCandidate(candidateId);
    const job = await getJob(jobId);

    if (!candidate) {
        throw candidateNotFoundError()
    }

    if (!job) {
        throw jobNotFoundError()
    }

    return { candidate, job }
}

export const getCandidate = async (id: string): Promise<CandidateEntity> => await getCandidateTable().first().where({ id })

export const getCandidateByEmail = async (email: string): Promise<CandidateEntity> => await getCandidateTable().first().where({ email });

export const addCandidate = async (input: CandidateCreateInput): Promise<CandidateEntity> => {
    const candidate: CandidateEntity = {
        id: generateId(),
        savedJobs: JSON.stringify([]),
        ...input,
    };

    await getCandidateTable().insert(candidate);

    return candidate;
};

export const getCandidateSavedJobs = async (candidate: CandidateEntity): Promise<JobList> => {
    const jobsIds = (typeof candidate.savedJobs === 'string' ? JSON.parse(candidate.savedJobs) : [...candidate.savedJobs]) as string[];

    console.log(jobsIds)

    const jobs = await Promise.all(jobsIds.map(async (id) => {
        const job = await getJob(id);

        return job ?? null;
    }).filter((job) => job));

    return {
        items: jobs,
        totalCount: jobs.length
    }
}

export const saveJobsForCandidate = async ({ candidateId, jobId }: MutationAddSavedJobArgs) => {
    const { candidate } = await checkJobAndCompany(candidateId, jobId)

    const savedCandidateJobs = (typeof candidate.savedJobs === 'string' ? JSON.parse(candidate.savedJobs) : [ ...candidate.savedJobs ]) as string[];

    if (!savedCandidateJobs.includes(jobId)) {
        savedCandidateJobs.push(jobId);

        await getCandidateTable()
            .where('id', candidateId)
            .update({ savedJobs: JSON.stringify(savedCandidateJobs) });
    }

    return savedCandidateJobs
}

export const removeSavedJobForCandidate = async ({ candidateId, jobId  }: MutationRemoveSavedJobArgs) => {
    const { candidate } = await checkJobAndCompany(candidateId, jobId)

    const savedCandidateJobs = (typeof candidate.savedJobs === 'string' ? JSON.parse(candidate.savedJobs) : [ ...candidate.savedJobs ]) as string[];

    candidate.savedJobs = savedCandidateJobs.length > 0 ? savedCandidateJobs.filter((id) => id !== jobId): savedCandidateJobs;

    await getCandidateTable()
        .where('id', candidateId)
        .update({ savedJobs: JSON.stringify(candidate.savedJobs) });

    return candidate.savedJobs
}