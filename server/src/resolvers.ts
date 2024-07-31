import {getJobs, getJob, addJob, getJobsByCompany, countJobs, updateJob, deleteJob} from "./db/jobs.js";
import { getCompany, addCompany } from "./db/company.js";
import {noPermissionError, unauthorizedError} from "./errors.ts";
import {addCandidate, getCandidate} from "./db/candidates.js";
import { Resolvers} from "./generated/shema.js";
import {Token} from "./ts/token.js";

export interface ResolverContext {
  context: Token
}

const checkPermission = (context: Token) => {
  if (context.role !== "company") {
    throw noPermissionError()
  }

  if (!context.id) {
    throw unauthorizedError()
  }
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
      checkPermission(context)

      const company = await getCompany(context.id);

      return addJob(company.id, company.country, input);
    },

    createCompany: async (_root, { input }) => addCompany(input),

    createCandidate: async (_root, { input }) => addCandidate(input),

    updateJob: async (_root, { id,companyId, input }, { context }) => {
      checkPermission(context)

     return await updateJob(id, companyId, input)
    },

    deleteJob: async (_root, { id, companyId }, { context }) => {
      checkPermission(context)

      return await deleteJob(id, companyId)
    },
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    requirements: (job) => {
      if (typeof job.requirements === 'string') {
        return JSON.parse(job.requirements)
      }
    },
  },

  Company: {
    jobs: async (company, { limit, offset}) => {
      const items = await getJobsByCompany(company.id, limit, offset);
      const totalCount  = await countJobs();

      return { items, totalCount }
    },
  },
};
