import {getJobs, getJob, addJob, getJobsByCompany, countJobs, updateJob, deleteJob} from "./db/jobs.js";
import { getCompany, addCompany } from "./db/company.js";
import {noPermissionError, unauthorizedError} from "./errors.ts";
import {addCandidate, getCandidate} from "./db/candidates.js";
import { Resolvers} from "./generated/shema.js";
import {Token} from "./ts/token.js";

export interface ResolverContext {
  context: Token
}

export const resolvers: Resolvers<ResolverContext> = {
  Query: {
    jobs: async (_root, { limit, offset }, { context }) => {
      const items = await getJobs(limit, offset);
      const totalCount  = await countJobs();

      return { items, totalCount }
    },
    company: (_root, { id }) => getCompany(id),
    job: (_root, { id }) => getJob(id),
    candidate: (_root, { id }) => getCandidate(id)
  },

  Mutation: {
    createJob: async (_root, { input }, { context }) => {
      if (context.role !== "company") {
        throw noPermissionError()
      }

      if (!context.name) {
        throw unauthorizedError()
      }

      const company = await getCompany(context.id);

      return addJob(company.id, company.country, input);
    },

    createCompany: async (_root, { input }) => addCompany(input),

    createCandidate: async (_root, { input }) => addCandidate(input),

    updateJob: async (_root, { id,companyId, input }) => updateJob(id, companyId, input),

    deleteJob: async (_root, { id, companyId }) => deleteJob(id, companyId),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    requirements: (job) => JSON.parse(job.requirements),
  },

  Company: {
    jobs: async (company, { limit, offset}) => {
      const items = await getJobsByCompany(company.id, limit, offset);
      const totalCount  = await countJobs();

      return { items, totalCount }
    },
  },
};
