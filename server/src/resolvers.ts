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
import {Message, Resolvers} from "./generated/shema.js";
import {Token} from "./ts/token.js";
import {PubSub} from "graphql-subscriptions";
import {createMessage, createResponse, getChat, getChatMessages} from "./db/chat.js";
import {createChat, getChats} from "./db/chat.js";

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
      throw noPermissionError()
    }
  } else {
    const company = await getCompany(context.id);

    if (!company) {
      throw noPermissionError()
    }
  }
}

// @ts-ignore
// @ts-ignore
export const resolvers: Resolvers<ResolverContext> = {
  Query: {
    jobs: async (_root, { limit, offset }, { context }) => {
      const items = await getJobs(limit, offset);
      const totalCount  = await countJobs();

      return { items, totalCount }
    },

    company: (_root, { id }) => getCompany(id),

    job: (_root, { id }) => getJob(id),

    candidate: (_root, { id }) => getCandidate(id),

    chats: async (_root, _args, { context}) => {
      await checkPermission(context);

      return await getChats(context.id, context.role)
    },

    messages: async (_root, { chatId }, { context } ) => getChatMessages(chatId, context.id, context.role),
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

    addMessage: async (_root, { text, chatId }, { context }) => {
      await checkPermission(context);

      const { id, senderId, dateCreated } = await createMessage(context.id, chatId, text);

      const sender = await (context.role === 'company' ? await getCompany(senderId) : getCandidate(senderId));
      const chat = await getChat(chatId, context.id, context.role);

      const message: Message = {
        id,
        text,
        dateCreated,
        sender: {
          id: sender.id,
          name: sender.name
        },
        chat
      };

      await pubSub.publish('MESSAGE_ADDED', { messageAdded: message })
    },

    addResponse: async (_root, { jobId, text }, { context }) => {
      checkCandidatePermission(context);

      const { response, message} = await createResponse(jobId, context.id, text);

      await pubSub.publish('MESSAGE_ADDED', { messageAdded: message })

      return response;
    }
  },

  Subscription: {
    messageAdded: {
      // @ts-ignore
      subscribe: () => pubSub.asyncIterator('MESSAGE_ADDED'),
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
