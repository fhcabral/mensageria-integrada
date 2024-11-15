export class verifyWebhookDto {
    hub_mode: string;
    hub_challenge: string;
    hub_verify_token: string;
}

export class MessageDto {
    text: string;
    sent: boolean;
    time: string
    type: string
}

export interface SendMessageDto {
    number: string
    message: MessageDto
}

export interface startMessageNumberDto {
    contactId: number
    phone: string
}