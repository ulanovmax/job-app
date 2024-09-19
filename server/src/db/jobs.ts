import { connection } from "./connection.js";
import { generateId } from "./ids.ts";
import {JobEntity} from "../ts/entities/job.entity.js";
import {Job, JobCreateInput} from "../generated/shema.js";
import {deleteResponse, getResponseByJob} from "./responses.js";

export const getJobTable = () => connection.table<JobEntity>("job");

export const getJobs = async (limit: number, offset: number): Promise<JobEntity[]> => {
  const query = getJobTable().select().orderBy("dateCreated", "desc");

  if (limit) {
    query.limit(limit)
  }

  if (offset) {
    query.offset(offset)
  }

  return await query
};

export const countJobs = async () => {
  const { count } = await getJobTable().first().count('*', { as: 'count' });

  return count as number
}

export const getJob = async (id: string): Promise<JobEntity> => await getJobTable().first().where({ id });

export const getJobsByCompany = async (companyId: string, limit?: number, offset?: number):  Promise<JobEntity[]> => {
  const query = getJobTable().select().where({companyId});

  if (limit) {
    query.limit(limit)
  }

  if (offset) {
    query.offset(offset)
  }

  return await query;
}

export const addJob = async (companyId: JobEntity["companyId"], country: JobEntity["country"], input: JobCreateInput) => {
  const { title, description, type, requirements } = input;

  const job: JobEntity = {
    id: generateId(),
    dateCreated: new Date().toISOString(),
    responses: JSON.stringify([]),
    companyId,
    country,
    title,
    description,
    type,
    requirements: JSON.stringify(requirements),
  };

  await getJobTable().insert(job);

  return job;
};

export const deleteJob = async (id: JobEntity["id"], companyId: JobEntity["companyId"]) => {
  const job = await getJobTable().first().where({ id, companyId });
  const response = await getResponseByJob(job.id)
  
  if (!job) {
    return null;
  }

  await deleteResponse(response.id)
  
  await getJobTable().delete().where({ id });
  
  return job;
}

export const updateJob = async (id: JobEntity["id"], companyId: JobEntity["companyId"], input: JobCreateInput ) => {
  const job: JobEntity = await getJobTable().first().where({ id, companyId });

  const { title, requirements, type, description } = input;
  
  if (!job) {
    return null;
  }

  const body = {
    title,
    type,
    description,
    requirements: JSON.stringify(requirements),
  }

  await getJobTable().update(body).where({ id });

  const updatedJob: JobEntity = {
    ...job,
    ...body,
  }

  return updatedJob;
};
