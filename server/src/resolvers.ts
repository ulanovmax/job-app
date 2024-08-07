import {getJobs, getJob, addJob, getJobsByCompany, countJobs, updateJob, deleteJob} from "./db/jobs.js";
import { getCompany, addCompany } from "./db/company.js";
import {noPermissionError, unauthorizedError} from "./errors.ts";
import {
  addCandidate,
  getCandidate,
  getCandidateSavedJobs,
  removeSavedJobForCandidate,
  saveJobsForCandidate
} from "./db/candidates.js";
import { Resolvers} from "./generated/shema.js";
import {Token} from "./ts/token.js";

export interface ResolverContext {
  context: Token
}

const checkCompanyPermission = (context: Token) => {
  if (context.role !== "company") {
    throw noPermissionError()
  }

  if (!context.id) {
    throw unauthorizedError()
  }
}

const checkCandidatePermission = (context: Token) => {
  if (context.role !== "candidate") {
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
      checkCompanyPermission(context)

      const company = await getCompany(context.id);

      return addJob(company.id, company.country, input);
    },

    createCompany: async (_root, { input }) => addCompany(input),

    createCandidate: async (_root, { input }) => addCandidate(input),

    updateJob: async (_root, { id,companyId, input }, { context }) => {
      checkCompanyPermission(context)

     return await updateJob(id, companyId, input)
    },

    deleteJob: async (_root, { id, companyId }, { context }) => {
      checkCompanyPermission(context)

      return await deleteJob(id, companyId)
    },

    addSavedJob: async (_root, { jobId, candidateId }, { context }) => {
      checkCandidatePermission(context);

      return await saveJobsForCandidate({ candidateId, jobId })
    },

    removeSavedJob: async (_root, { jobId, candidateId }, { context }) => {
      checkCandidatePermission(context);

      return await removeSavedJobForCandidate({ candidateId, jobId })
    }
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

  Candidate: {
    savedJobs: async (candidate) => getCandidateSavedJobs(candidate)
  }
};
