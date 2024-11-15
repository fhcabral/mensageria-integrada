export class WhatsAppTemplateMessageWithImage {
    private readonly messaging_product = 'whatsapp';
    private readonly type = 'template';
    private readonly default_image_path = process.env.WHATSAPP_TEMPLATE;
    private readonly languageCode = 'pt_BR';
    private readonly template_name = 'pesquisa_fonada_template';
    private to: string;

    public constructor(
        destiny: string, 
    ) {
        this.to = destiny;
    }

    getPayload() {
        return {
                messaging_product: this.messaging_product,
                recipient_type: "individual",
                to: this.to,
                type: this.type,
                template: {
                    name: this.template_name,
                    language: {
                        code: this.languageCode
                    },
                    components: [
                        {
                            type: "header",
                            parameters: [
                                {
                                    type: "image",
                                    image: {
                                        link: this.default_image_path
                                    }
                                }
                            ]
                        },
                        {
                            type: "body"
                        },
                        {
                            type: "button",
                            sub_type: "quick_reply",
                            index: "0",
                            parameters: [
                                {
                                    type: "text",
                                    text: "OK",
                                    payload: "payload"
                                }
                            ]
                        }
                    ]
                }
            }
    }
}

export class StandardMessageTemplate {
    private readonly messaging_product = 'whatsapp';
    private readonly recipient_type = 'individual'
    private readonly type = 'text';
    private to: string;
    private text: string;

    constructor(destiny: string, message: string) {
        this.to = destiny;
        this.text = message;
    }

    getPayload() {
        return {
            messaging_product: this.messaging_product,
            recipient_type: this.recipient_type,
            to: this.to,
            type: this.type,
            text: {
                body: this.text
            }
        };
    }

}