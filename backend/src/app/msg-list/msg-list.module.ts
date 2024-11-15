import { Module } from '@nestjs/common';
import { MsgListController } from './msg-list.controller';
import { MsgListService } from './msg-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './msg-list.entity';
import { ServicesModule } from 'src/utils/services/services.module';
import { RecipentsEntity } from '../recipient/recipient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity, RecipentsEntity]), ServicesModule],
  controllers: [MsgListController],
  providers: [MsgListService]
})
export class MsgListModule {}
