import {getJobs, getJob, addJob, getJobsByCompany, countJobs} from "./db/jobs.js";
import { getCompany, addCompany } from "./db/company.js";
import {noPermissionError, unauthorizedError} from "./errors.ts";
import {addCandidate} from "./db/candidates.js";
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

      return { items, totalCount  }
    },
    company: (_root, { id }) => getCompany(id),
    job: (_root, { id }) => getJob(id),
  },

  Mutation: {
    createJob: async (_root, { input }, { context }) => {
      if (context.role !== "company") {
        throw noPermissionError()
      }

      if (!context.name) {
        throw unauthorizedError()
      }

      const company = await getCompany(context.id)

      return addJob({
        companyId: company.id,
        country: company.country
      }, input);
    },

    createCompany: async (_root, { input }) => addCompany(input),

    createCandidate: async (_root, { input }) => addCandidate(input)
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    requirements: (job) => JSON.parse(job.requirements),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
};
