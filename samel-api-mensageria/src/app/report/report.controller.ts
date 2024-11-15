import { Body, Controller, HttpCode, HttpStatus,Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { RecipientReportDto } from './dto/report.dto';

@Controller('report')
export class ReportController {
    constructor (private readonly reportService: ReportService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    async postGenerateReport(@Body() data: RecipientReportDto[]) {
        return await this.reportService.gerarRelatorio(data);
    }

}
