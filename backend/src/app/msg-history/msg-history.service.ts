import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { MsgHistoryWpEntity } from './msg-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { MsgCreateCreateDto } from './dto/msg-history-create.dto';
import { genericExceptionError } from 'src/utils/exceptions/generecExceptionError';

@Injectable()
export class MsgHistoryService {
  constructor(
    @InjectRepository(MsgHistoryWpEntity)
    private readonly msgHistoryRepository: Repository<MsgHistoryWpEntity>,
  ) {}
  async findOne(id: number) {
    const finalBackup = [];
    const data = await this.msgHistoryRepository.find ({ where: { nrSequencia: id }, order: { dtMensagem: 'ASC'} });
    if (!data) throw new NotFoundException(MessagesHelper.NOT_FOUND);

    for (const chat of data) {
      const { dsMensagem, dtMensagem, tpOrigem } = chat
      const time = `${dtMensagem.getHours()}:${dtMensagem.getMinutes().toString().padStart(2,'0')}`;
      const messages = {
        text: dsMensagem,
        sent: true,
        time,
        type: tpOrigem,
      }
    finalBackup.push(messages)
    } 
    return finalBackup;
  }

  async findSentMsg(id: number) {
    const data = await this.msgHistoryRepository.findOne({ where: { nrSequencia: id }, order: { dtMensagem: 'ASC'} });
    if (!data) return null;
      const { dsMensagem, dtMensagem, tpOrigem } = data
      const time = `${dtMensagem.getHours()}:${dtMensagem.getMinutes().toString().padStart(2,'0')}`;
      const messages = {
        text: dsMensagem,
        sent: true,
        time,
        type: tpOrigem,
      }
    return messages;
  }


  async create(data: MsgCreateCreateDto) {
    try {
      const {contactId, messages} = data;
      const { text, type } = messages[0]

      const msgHistory = new MsgHistoryWpEntity();
      msgHistory.nrSequencia = contactId;
      msgHistory.dsMensagem = text;
      msgHistory.tpOrigem = type

      const savedData = await this.msgHistoryRepository.save(msgHistory);

      return { message: MessagesHelper.CREATED, data: savedData };
    } catch (error) {
      genericExceptionError(error);
    }
  }

  async delete(id: number) {
    await this.msgHistoryRepository.delete(id);

    return { message: MessagesHelper.DELETED };
  }
}
