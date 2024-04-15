import { connection } from "./connection.ts";
import { generateId } from "./ids.ts";

const getJobTable = () => connection.table("job");

export const getJobs = async (limit: number, offset: number) => {
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
  const { count } = await getJobTable().first().count("*", "count");

  return count as number
}

export const getJob = async (id: string) => await getJobTable().first().where({ id });

export const getJobsByCompany = async (companyId: string) =>
  await getJobTable().select().where({ companyId });

export const addJob = async ({ companyId, country }, input) => {
  const { title, description, type, requirements } = input;

  const job = {
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
