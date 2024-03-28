import { getJobs, getJob, addJob } from "./db/jobs.js";
import { getCompany } from "./db/company.js";

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
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    requirements: (job) => JSON.parse(job.requirements),
  },
};
