import { getJobs } from "./db/jobs.js";
import { getCompany } from "./db/company.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    company: (_root, { id }) => getCompany(id),
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    requirements: (job) => JSON.parse(job.requirements),
  },
};
