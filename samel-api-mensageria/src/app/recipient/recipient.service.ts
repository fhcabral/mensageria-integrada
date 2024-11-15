import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { RecipentsEntity } from './recipient.entity';
import { head } from 'lodash';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { recipientDTO } from './dto/recipient-create.dto';
import { ServicesService } from 'src/utils/services/services.service';
import * as Papa from 'papaparse';
import { formatDate } from 'src/utils/functionsUtils';
import { recipientDtoUpdate } from './dto/recipient-update.dto';
import { genericExceptionError } from 'src/utils/exceptions/generecExceptionError';
@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(RecipentsEntity)
    private readonly RecipientRepository: Repository<RecipentsEntity>,
    private readonly ServicesUtils: ServicesService,
  ) {}

  async findAll(nr_list: string) {
    const data = await this.RecipientRepository.find({
      where: { nr_list: nr_list },
    });
    const validData = !!head(data);

    if (!validData) throw new NotFoundException(MessagesHelper.NOT_FOUND);

    const dateFormat = data.map((item) => {
      return {
        ...item,
        date_create: formatDate(item.date_create),
        date_update: formatDate(item.date_update),
      };
    });

    return { message: MessagesHelper.CREATED, data: dateFormat };
  }

  private async parseCsv(csvData: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results: { data: any[] }) => {
          const normalizedData = results.data.map((row) => {
            const normalizedRow = {};
            for (const key in row) {
              const normalizedKey = key.trim().toUpperCase();
              normalizedRow[normalizedKey] = row[key];
            }
            return normalizedRow;
          });
          resolve(normalizedData);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  async create(data: recipientDTO) {
    const SYSDATE = await this.ServicesUtils.getDatabaseDate();
    const base64Data = data.list_base64.split(',')[1];
    const decodedCsv = Buffer.from(base64Data, 'base64').toString('utf-8');

    const rows = await this.parseCsv(decodedCsv);

    const requiredColumns = ['NOME', 'TELEFONE', 'CD PESSOA FISICA'];
    const header = Object.keys(rows[0]);
    const hasRequiredColumns = requiredColumns.every((col) =>
      header.includes(col),
    );

    if (!hasRequiredColumns) {
      throw new Error('As colunas necessárias não estão presentes no CSV');
    }

    for (const row of rows) {
      const recipient = new RecipentsEntity();

      const fullName = row['NOME'];

      const firstName = fullName.split(' ')[0];

      recipient.fist_name = firstName;
      recipient.full_name = fullName;

      recipient.telephone = row['TELEFONE'];
      recipient.person_code = Number(row['CD PESSOA FISICA']);
      recipient.username = data.username;
      recipient.nr_list = data.list_code;
      recipient.date_create = SYSDATE;
      recipient.date_update = SYSDATE;

      await this.RecipientRepository.save(recipient);
    }
  }

  async update(data: recipientDtoUpdate) {
    try {
      const { id, ...rest } = data;
      const recipient = await this.RecipientRepository.findOne({
        where: { id: data.id },
      });

      if (!recipient) throw new NotFoundException(MessagesHelper.NOT_FOUND);

      const SYSDATE = await this.ServicesUtils.getDatabaseDate();

      await this.RecipientRepository.update(id, {
        ...rest,
        date_update: SYSDATE,
      });

      return { message: MessagesHelper.UPDATED };
    } catch (error) {
      genericExceptionError(error);
    }
  }

  async delete(id: number) {
    const recipient = await this.RecipientRepository.findOne({ where: { id } });

    if (!recipient) throw new NotFoundException(MessagesHelper.NOT_FOUND);

    await this.RecipientRepository.delete(id);

    return { message: MessagesHelper.DELETED };
  }
}
