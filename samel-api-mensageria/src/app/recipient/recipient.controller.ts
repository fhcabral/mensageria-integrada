import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { recipientDTO } from './dto/recipient-create.dto';
import { recipientDtoUpdate } from './dto/recipient-update.dto';

@Controller('recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @HttpCode(HttpStatus.OK)
  @Get('list/:nr_list')
  findAll(@Param('nr_list') nr_list: string) {
    return this.recipientService.findAll(nr_list);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  create(@Body() data: recipientDTO) {
    return this.recipientService.create(data);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update')
  update(@Body() data: recipientDtoUpdate) {
    return this.recipientService.update(data);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:sequence')
  delete(@Param('sequence') data: number) {
    return this.recipientService.delete(data);
  }
}
