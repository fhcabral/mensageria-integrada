import { Module } from '@nestjs/common';
import { MsgHistoryController } from './msg-history.controller';
import { MsgHistoryService } from './msg-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MsgHistoryWpEntity } from './msg-history.entity';
import { ServicesModule } from 'src/utils/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([MsgHistoryWpEntity]), ServicesModule],
  controllers: [MsgHistoryController],
  providers: [MsgHistoryService]
})
export class MsgHistoryModule {}
