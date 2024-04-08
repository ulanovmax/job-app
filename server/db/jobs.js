import { connection } from "./connection.js";
import { generateId } from "./ids.js";

const getJobTable = () => connection.table("job");

export const getJobs = async (limit) => {
  const query = getJobTable().select().orderBy("dateCreated", "desc");

  if (limit) {
    query.limit(limit)
  }

  return await query
};

export const getJob = async (id) => await getJobTable().first().where({ id });

export const getJobsByCompany = async (companyId) =>
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
