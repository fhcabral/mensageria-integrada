import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MsgHistoryWpEntity } from '../msg-history/msg-history.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MsgHistoryWpEntity])],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
