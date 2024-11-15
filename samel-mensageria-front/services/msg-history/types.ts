export interface IContacts {
    id: number
    full_name: string
    list_code: string
    telephone: string
    lastMessage?: string | ''
}

export interface IMessage {
    text: string;
    sent: boolean;
    time: string
    type: string
}

export interface IConversation {
    contactId: number;
    messages: IMessage[];
}

export interface IContactSelection {
    selected: true,
    contact: IContacts
}

export interface IWebhookMessage {
    phone_no_id: string;
    from: string;
    msg_body: string;
}

export interface ISendMessage {
    number: string
    message: IMessage
}

export interface IMessageQueueItem {
    id: string;
    from: string;
    message: string;
    timestamp: number;
    processed: boolean;
  }