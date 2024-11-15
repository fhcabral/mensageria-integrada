import { Module } from '@nestjs/common';
import { RecipientController } from './recipient.controller';
import { RecipientService } from './recipient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipentsEntity } from './recipient.entity';
import { ServicesModule } from 'src/utils/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecipentsEntity]), ServicesModule],
  controllers: [RecipientController],
  providers: [RecipientService]
})
export class RecipientModule {}
