import { Module } from '@nestjs/common';
import { ServicesService, SysdateEntity } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SysdateEntity])],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
