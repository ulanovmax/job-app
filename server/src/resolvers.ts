import {
  getJobs,
  getJob,
  addJob,
  getJobsByCompany,
  countJobs,
  updateJob,
  deleteJob,
} from "./db/jobs.js";
import {getCompany, addCompany} from "./db/company.js";
import {
  candidateNotFoundError, companyNotFoundError,
  noPermissionError,
  unauthorizedError,
} from "./errors.ts";
import {
  addCandidate,
  getCandidate,
  getCandidateSavedJobs,
  removeSavedJobForCandidate,
  saveJobsForCandidate
} from "./db/candidates.js";
import { Resolvers} from "./generated/shema.js";
import {Token} from "./ts/token.js";
import {PubSub} from "graphql-subscriptions";
import {createResponse, getCandidateResponses, getCompanyResponses, getResponse} from "./db/responses.js";

export interface ResolverContext {
  context: Token
}

const pubSub = new PubSub()

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

const checkPermission = async (context: Token) => {
  if (context.role === "candidate") {
    const candidate = await getCandidate(context.id);

    if (!candidate) {
      throw candidateNotFoundError()
    }
  } else {
    const company = await getCompany(context.id);

    if (!company) {
      throw companyNotFoundError()
    }
  }
}

// @ts-ignore
// @ts-ignore
export const resolvers: Resolvers<ResolverContext> = {
  Query: {
    jobs: async (_root, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount  = await countJobs();

      return { items, totalCount }
    },

    company: (_root, { id }) => getCompany(id),

    job: (_root, { id }) => getJob(id),

    candidate: (_root, { id }) => getCandidate(id),

    responses: async (_root, _args, { context }) => {
      await checkPermission(context)

      if (context.role === 'company') {
        return await getCompanyResponses(context.id)
      } else {
        return await getCandidateResponses(context.id)
      }
    },

    response: async (_root, { id }) => getResponse(id),
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
    },

    addResponse: async (_root, { jobId, text }, { context }) => {
      checkCandidatePermission(context);

      const response = await createResponse(jobId, context.id, text);

      await pubSub.publish('RESPONSE_ADDED', { responseAdded: response })

      return response;
    }
  },

  Subscription: {
    responseAdded: {
      // @ts-ignore
      subscribe: () => pubSub.asyncIterator('RESPONSE_ADDED'),
    }
  },

  Job: {
    company: (job) => getCompany(job.companyId),
    requirements: (job) => {
      if (typeof job.requirements === 'string') {
        return JSON.parse(job.requirements)
      }
    },
    responses: (job) => {
      if (typeof job.responses === 'string') {
        return JSON.parse(job.responses)
      }
    }
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
  },

  Response: {
    job: async (response) => getJob(response.jobId),
    company: async (response) => getCompany(response.companyId),
    candidate: async (response) => getCandidate(response.candidateId),
  }
};
