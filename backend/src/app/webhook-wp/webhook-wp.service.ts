import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMessageDto, startMessageNumberDto, verifyWebhookDto } from './dto/verific-webhook.dto';
import { genericExceptionError } from 'src/utils/exceptions/generecExceptionError';
import { ChatGateway } from './chat.gateway';
import axios from 'axios';
import { WhatsAppTemplateMessageWithImage } from '../templates-wp/templates-wp';
import { StandardMessageTemplate } from '../templates-wp/templates-wp';
import { MsgHistoryWpEntity } from '../msg-history/msg-history.entity';
import { RecipentsEntity } from '../recipient/recipient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class WebhookWpService {
  private readonly accessToken: string;
  private readonly phoneNumberId: string;
  private readonly version = 'v21.0';
  private readonly baseUrl: string;

  constructor(
    private chatGateway: ChatGateway,
    private configService: ConfigService,
    @InjectRepository(MsgHistoryWpEntity)
    private readonly msgHistoryRepository: Repository<MsgHistoryWpEntity>,
    @InjectRepository(RecipentsEntity)
    private readonly destinyRepository: Repository<RecipentsEntity>
  ) {
    this.accessToken = this.configService.get<string>('WHATSAPP_ACCESS_TOKEN');
    this.phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID');
    this.baseUrl = `https://graph.facebook.com/${this.version}`;
  }

  getWebhook(data: verifyWebhookDto) {
    let mode = data.hub_mode;
    let challenge = data.hub_challenge;
    let token = data.hub_verify_token;

    const mytoken = process.env.WEBHOOK_VERIFY_TOKEN;

    if (mode && token) {
      if (mode === 'subscribe' && token === mytoken) {
        return challenge;
      } else {
        genericExceptionError('Error');
      }
    }
  }

  async postWebhook(data: any) {
    const body_param = data;
    const value = body_param.entry[0].changes[0].value || '';
    const message = value.messages || [];
    const userData = message[0] || '';
    const phone_number_id = value.metadata.phone_number_id || '';
    const user_number = userData.from || '';
    const msg_body = userData.text?.body || '';
  
    const from = this.formatPhoneNumber(user_number);
    const numberToSave = this.formatPhoneToSave(from);
      if (phone_number_id && from && msg_body) {
        const messageData = {
          phone_number_id,
          from,
          msg_body,
        };
        const destiny = await this.destinyRepository.findOne({where: { telephone: numberToSave}, order: { date_create: 'DESC'}})
        const msgHistory = new MsgHistoryWpEntity();
        msgHistory.nrSequencia = destiny.id
        msgHistory.dsMensagem = msg_body;
        msgHistory.tpOrigem = 'P'
        await this.msgHistoryRepository.save(msgHistory);
        // Emite a mensagem via Socket.IO
        this.chatGateway.emitMessage(messageData);
        return messageData;
     }
    return null;
  }

  async sendMessage(data: SendMessageDto) {
    try {
      const formattedNumber = this.formatPhoneNumber(data.number);
      const messageTemplate =  new StandardMessageTemplate(formattedNumber, data.message.text)
      const payload = messageTemplate.getPayload();

      try{
      const response = await axios.post(
        `${this.baseUrl}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      return { 
        success: true,
        data: response.data
      }
    } catch(axiosError) {
      console.error('Axios Error:', axiosError.response?.data);
      return {
        success: false,
        error: axiosError.response?.data || 'Erro desconhecido'
      };
    }
    } catch (error) {
       genericExceptionError(error)
    }
  }

  async sendStartedTemplate (data: startMessageNumberDto) {
    try {
    const formattedNumber = this.formatPhoneNumber(data.phone);
    const message = new WhatsAppTemplateMessageWithImage(formattedNumber);
    const payload = message.getPayload();
    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );
      const msgHistory = new MsgHistoryWpEntity();
      msgHistory.nrSequencia = data.contactId
      msgHistory.dsMensagem = 'Prezado, caso esteja sentindo algum dos sintomas acima, nos retorne atrávés do número: (92) 992844515';
      msgHistory.tpOrigem = 'U'
      await this.msgHistoryRepository.save(msgHistory);

      return { 
        success: true,
        data: response.data
      }
  } catch (axiosError) {
      console.error('Axios Error:', axiosError.response?.data);
      return {
        success: false,
        error: axiosError.response?.data || 'Erro desconhecido'
      };
  }

  } catch(error) {
     genericExceptionError(error)
  }
  }

  private formatPhoneNumber(number: string): string {
    let cleaned = number.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    // Adiciona o código do país se não estiver presente
    if (!cleaned.startsWith('55')) {
      cleaned = '55' + cleaned;
    }
    if (cleaned.length === 12) {
      cleaned = cleaned.slice(0, 4) + '9' + cleaned.slice(4); // Adiciona o 9
    }
    return cleaned;
  }

  private formatPhoneToSave(number: string): string {
    // Remove todos os caracteres não numéricos
    let cleaned = number.replace(/\D/g, '');
    // Remove o código 55 se estiver presente
    if (cleaned.startsWith('55')) {
      cleaned = cleaned.slice(2);
    }
    // Adiciona 9 se não estiver presente
    if (cleaned.length === 10) {
      cleaned = '9' + cleaned;
    }
    // Retorna no formato 929 + restante
    return '929' + cleaned.slice(-8);
}
  
}
