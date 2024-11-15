import { Module } from '@nestjs/common';
import { WebhookWpService } from './webhook-wp.service';
import { WebhookWpController } from './webhook-wp.controller';
import { ChatGateway } from './chat.gateway';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MsgHistoryWpEntity } from '../msg-history/msg-history.entity';
import { RecipentsEntity } from '../recipient/recipient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MsgHistoryWpEntity, RecipentsEntity])],
  providers: [WebhookWpService, ChatGateway, ConfigService],
  controllers: [WebhookWpController]
})
export class WebhookWpModule {}
