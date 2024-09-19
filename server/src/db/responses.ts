import { connection } from './connection.js';
import { generateId } from './ids.js';
import {getJob, getJobTable } from "./jobs.js";
import {jobNotFoundError, responseAlreadySentError} from "../errors.js";
import { ResponseEntity} from "../ts/entities/job.entity.js";

export const getResponsesTable = () => connection.table("responses");

export async function createResponse(jobId: string, candidateId: string, text: string) {
    const job = await getJob(jobId);

    if (!job) {
        throw jobNotFoundError();
    }

    if (job.responses.includes(candidateId)) {
        throw responseAlreadySentError()
    }

    const id = generateId();
    const dateCreated = new Date().toISOString();

    const jobResponses = typeof job.responses === 'string' ? JSON.parse(job.responses) : job.responses
    const responses = JSON.stringify([...jobResponses, candidateId])

    await getJobTable().update({
        ...job,
        responses
    }).where({ id: jobId });

    const response: ResponseEntity = {
        id,
        jobId,
        candidateId,
        companyId: job.companyId,
        dateCreated,
        message: text
    }

    await getResponsesTable().insert(response);

    return response
}

export const getCompanyResponses = async (companyId: string) => {
    return getResponsesTable().select().where({companyId}).orderBy("dateCreated", "desc");
}

export const getCandidateResponses = async (candidateId: string) => {
    return getResponsesTable().select().where({candidateId}).orderBy("dateCreated", "desc");
}

export const getResponse = async (id: string) => await getResponsesTable().first().where({ id })

export const getResponseByJob = async (jobId: string) => await getResponsesTable().first().where({ jobId })

export const deleteResponse = async (id: string) => await getResponsesTable().delete().where({ id })