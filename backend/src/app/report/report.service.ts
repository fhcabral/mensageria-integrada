import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { RecipientReportDto } from './dto/report.dto';
import { MsgHistoryWpEntity } from '../msg-history/msg-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ReportService {

  constructor(
    @InjectRepository(MsgHistoryWpEntity)
    private readonly msgHistoryRepository: Repository<MsgHistoryWpEntity>
  ) {}

  async gerarRelatorio(data: RecipientReportDto[]) {
    const successfulRecipients = data.filter(r => r.status);
    const failedRecipients = data.filter(r => !r.status);
    const responseRecipients = await Promise.all(
      successfulRecipients.map(async (response) => {
        const msgFound = await this.msgHistoryRepository.findOne({
          where: { nrSequencia: response.id, tpOrigem: 'P' }
        });
        
        return msgFound?.dsMensagem.length > 0 ? response : null;
      })
    ).then(result => result.filter(item => item !== null));

    const workbook = new ExcelJS.Workbook();
    
    const successSheet = workbook.addWorksheet('Mensagens Enviadas');
    successSheet.columns = [
      { header: 'Nome', key: 'nome', width: 30 },
      { header: 'Telefone', key: 'telefone', width: 20 },
      { header: 'CPF', key: 'cpf', width: 20 }
    ];

    successSheet.addRows(
      successfulRecipients.map(recipient => ({
        nome: recipient.nome,
        telefone: recipient.telefone,
        cpf: recipient.cpf
      }))
    );

    successSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'EEEEEE' }
      };
    });

    const responsesheet = workbook.addWorksheet('Mensagens Respondidas');
    responsesheet.columns = [
      { header: 'Nome', key: 'nome', width: 30 },
      { header: 'Telefone', key: 'telefone', width: 20 },
      { header: 'CPF', key: 'cpf', width: 20 }
    ];

    responsesheet.addRows(
      responseRecipients.map(recipient => ({
        nome: recipient.nome,
        telefone: recipient.telefone,
        cpf: recipient.cpf
      }))
    );

    responsesheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'EEEEEE' }
      };
    });

    const failedSheet = workbook.addWorksheet('Mensagens Não Enviadas');
    failedSheet.columns = [
      { header: 'Nome', key: 'nome', width: 30 },
      { header: 'Telefone', key: 'telefone', width: 20 },
      { header: 'CPF', key: 'cpf', width: 20 }
    ];

    failedSheet.addRows(
      failedRecipients.map(recipient => ({
        nome: recipient.nome,
        telefone: recipient.telefone,
        cpf: recipient.cpf
      }))
    );

    failedSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'EEEEEE' }
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    return {
      base64,
      total: data.length,
      enviadas: successfulRecipients.length,
      naoEnviadas: failedRecipients.length,
    };
  }
  
}
