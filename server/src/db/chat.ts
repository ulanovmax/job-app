import { connection } from './connection.js';
import { generateId } from './ids.js';
import {MessageEntity, ChatEntity} from "../ts/entities/chat.entity.ts"
import {getJob, getJobTable } from "./jobs.js";
import {jobNotFoundError} from "../errors.js";
import {ResponseEntity} from "../ts/entities/job.entity.js";
import {Chat, Message} from "../generated/shema.js";
import {getCandidate} from "./candidates.js";
import {Token} from "../ts/token.js";
import {getCompany} from "./company.js";

const getChatTable = () => connection.table('chats');
const getMessagesTable = () => connection.table('messages');
const getResponsesTable = () => connection.table("responses");

export async function getChats(userId: string, role: Token['role']): Promise<Chat[]> {
    const chats: ChatEntity[] = [];

    const senderChats = await getChatTable().where({ senderId: userId }).select("*").orderBy('dateCreated', 'asc');
    const sender = await (role === 'company' ? await getCompany(userId) : getCandidate(userId))

    if (senderChats.length > 0) {
        chats.push(...senderChats);
    }

    return chats.map((chat) => {
        return {
            id: chat.id,
            dateCreated: chat.dateCreated,
            sender: {
              id: sender.id,
                name: sender.name,
            },
        }
    })
}

export const getChatMessages = async (chatId: string, senderId: string, role: Token['role']): Promise<Message[]> => {
    const messages: MessageEntity[] = await getMessagesTable().select().where({ chatId });
    const chat = await getChat(chatId, senderId, role);

    return messages.map((msg) => {
        return {
            id: msg.id,
            text: msg.text,
            dateCreated: msg.dateCreated,
            sender: {
                id: chat.sender.id,
                name: chat.sender.name,
            },
            chat,
        }
    })
};

export const getChat = async (id: string, senderId: string, role: Token['role']): Promise<Chat> => {
    const chat: ChatEntity = await getChatTable().first().where({ id });
    const sender = await (role === 'company' ? await getCompany(senderId) : getCandidate(senderId))

    return {
        id: chat.id,
        dateCreated: chat.dateCreated,
        sender: {
            id: chat.senderId,
            name: sender.name
        }
    }
};

export async function createChat(candidateId: string, companyId: string, text: string) {
    const candidate = await getCandidate(candidateId);

    const body: Pick<ChatEntity, 'dateCreated' | 'id'> = {
        dateCreated: new Date().toISOString(),
        id: generateId(),
    }

    const message = await createMessage(candidateId, body.id, text);

    const chat: ChatEntity = {
        ...body,
        senderId: candidateId
    };

    const chatResponse: Chat = {
        ...body,
        sender: {
            id: candidate.id,
            name: candidate.name,
        }
    }

    await getChatTable().insert(chat);

    const messageResponse: Message = {
        chat: chatResponse,
        dateCreated: message.dateCreated,
        text: message.text,
        id: message.id,
        sender: {
            id: candidate.id,
            name: candidate.name
        }
    }

    return { message: messageResponse };
}

export async function createMessage(senderId: string, chatId: string, text: string) {
    const messageEntity: MessageEntity = {
        text,
        id: generateId(),
        dateCreated: new Date().toISOString(),
        chatId,
        senderId
    }

    await getMessagesTable().insert(messageEntity)

    return messageEntity;
}

export async function createResponse(jobId: string, candidateId: string, text: string) {
    const job = await getJob(jobId);

    if (!job) {
        throw jobNotFoundError();
    }

    const responses = job.responses + 1

    await getJobTable().update({
        ...job,
        responses
    }).where({ id: jobId });

    const { message } = await createChat(candidateId, job.companyId, text);

    const response: ResponseEntity = {
        id: generateId(),
        jobId,
        candidateId,
        dateCreated: new Date().toISOString(),
    }

    await getResponsesTable().insert(response);

    return {response, message}
}

export const getResponsesForCandidate = async (candidateId: string) => await getResponsesTable().where({ candidateId }).select('*')

export const getResponseForCompany = async (companyId: string) => await getResponsesTable().where({ companyId }).select('*')