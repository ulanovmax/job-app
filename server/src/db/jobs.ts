import { connection } from "./connection.js";
import { generateId } from "./ids.ts";
import {JobEntity} from "../ts/entities/job.entity.js";
import {JobCreateInput} from "../generated/shema.js";

const getJobTable = () => connection.table<JobEntity>("job");

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
    responses: 0,
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
  
  if (!job) {
    return null;
  }
  
  await getJobTable().delete().where({ id });
  
  return job;
}

export const updateJob = async (id: JobEntity["id"], companyId: JobEntity["companyId"], input: JobCreateInput ) => {
  const job: JobEntity = await getJobTable().first().where({ id, companyId });
  
  if (!job) {
    return null;
  }
  
  await getJobTable().update(input).where({ id });
  
  return { ...job, ...input } as JobEntity;
}
