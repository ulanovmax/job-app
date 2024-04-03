import { getJobs, getJob, addJob, getJobsByCompany } from "./db/jobs.js";
import { getCompany, addCompany } from "./db/company.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    company: (_root, { id }) => getCompany(id),
    job: (_root, { id }) => getJob(id),
  },

  Mutation: {
    createJob: async (_root, { input }) => {
      const companyId = "FjcJCHJALA4i";
      const country = "Ukraine";

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
