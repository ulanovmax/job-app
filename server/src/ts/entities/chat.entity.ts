export interface ChatEntity {
    id: string;
    dateCreated: string;
    senderId: string;
}

export interface MessageEntity {
    id: string;
    text: string;
    chatId: string;
    dateCreated: string;
    senderId: string;
}