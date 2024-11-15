import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ListEntity } from './msg-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { head } from 'lodash';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { MsgListCreateDto } from './dto/msg-list-create.dto';
import { MsgListUpdateDto } from './dto/msg-list-update.dto';
import { genericExceptionError } from 'src/utils/exceptions/generecExceptionError';
import { ServicesService } from 'src/utils/services/services.service';
import { formatDate } from 'src/utils/functionsUtils';
import { RecipentsEntity } from '../recipient/recipient.entity';
@Injectable()
export class MsgListService {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
    private readonly ServicesUtils: ServicesService,

    @InjectRepository(RecipentsEntity)
    private readonly destinyRepository: Repository<RecipentsEntity>,
  ) {}

  async findAll() {
    const data = await this.listRepository.find();

    const validData = !!head(data);

    if (!validData) throw new NotFoundException(MessagesHelper.NOT_FOUND);

    const dateFormat = data.map((item) => {
      return {
        ...item,
        date_create: formatDate(item.date_create),
        date_update: formatDate(item.date_update)
      }
    })

    return dateFormat;
  }

  async findOne(id: number) {
    const data = await this.listRepository.findOne({ where: { id } });

    if (!data) throw new NotFoundException(MessagesHelper.NOT_FOUND);

    return data;
  }

  async create(data: MsgListCreateDto) {
    try {
      const savedData = await this.listRepository.save(data);

      return { message: MessagesHelper.CREATED, data: savedData };
    } catch (error) {
      genericExceptionError(error);
    }
  }

  async update(data: MsgListUpdateDto) {
    try {
      const { id, ...rest } = data;

      const SYSDATE = await this.ServicesUtils.getDatabaseDate();
      
      const updatedData = await this.listRepository.update(id, { ...rest, date_update: SYSDATE });
  
      if (!updatedData.affected)
        throw new NotFoundException(MessagesHelper.NOT_FOUND);
  
      return { message: MessagesHelper.UPDATED };
    } catch (error) {
      genericExceptionError(error);
    }
  }

  async delete(id: number) {
    const idString = String(id)
    await this.destinyRepository.delete({nr_list: idString})
    await this.listRepository.delete({id: id});
    return { message: MessagesHelper.DELETED };
  }
}
