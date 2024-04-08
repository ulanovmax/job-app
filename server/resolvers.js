import {getJobs, getJob, addJob, getJobsByCompany, countJobs} from "./db/jobs.js";
import { getCompany, addCompany } from "./db/company.js";
import {unauthorizedError} from "./errors.js";

export const resolvers = {
  Query: {
    jobs: async (_root, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount  = await countJobs();

      return { items, totalCount  }
    },
    company: (_root, { id }) => getCompany(id),
    job: (_root, { id }) => getJob(id),
  },

  Mutation: {
    createJob: async (_root, { input }, { accessToken }) => {
      const companyId = "FjcJCHJALA4i";
      const country = "Ukraine";

      if (!accessToken) {
        throw unauthorizedError()
      }

      return addJob({ companyId, country }, input);
    },

    createCompany: async (_root, { input }) => addCompany(input),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    requirements: (job) => JSON.parse(job.requirements),
  },

  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
};
