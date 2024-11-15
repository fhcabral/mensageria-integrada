import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { MsgListModule } from './msg-list/msg-list.module';
import { RecipientModule } from './recipient/recipient.module';
import { WebhookWpModule } from './webhook-wp/webhook-wp.module';
import { MsgHistoryModule } from './msg-history/msg-history.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.ORACLE_HOST,
      port: Number(process.env.ORACLE_PORT),
      username: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTION_STRING,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    AuthModule,
    MsgListModule,
    RecipientModule,
    WebhookWpModule,
    MsgHistoryModule,
    ReportModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
