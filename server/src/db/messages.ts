import { connection } from './connection.js';
import { generateId } from './ids.js';
import {MessageEntity} from "../ts/entities/message.entity.js";

const getMessageTable = () => connection.table('messages');

export async function getMessages() {
    return await getMessageTable().select().orderBy('dateCreated', 'asc');
}

export async function createMessage(senderId: string, receiverId: string, content: string) {
    const message: MessageEntity = {
        id: generateId(),
        senderId,
        receiverId,
        content,
        dateCreated: new Date().toISOString(),
    };

    await getMessageTable().insert(message);

    return message;
}
