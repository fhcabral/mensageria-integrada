import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MsgHistoryService } from './msg-history.service';
import { MsgCreateCreateDto } from './dto/msg-history-create.dto';

@Controller('msg-history')
export class MsgHistoryController {
   constructor (private readonly msgListService: MsgHistoryService) { }

    @HttpCode(HttpStatus.OK)
    @Get(':id') 
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.msgListService.findOne(id);
    }

    @Get('sent-msg/:id') 
    findOneSentMsg(@Param('id', ParseIntPipe) id: number){
        return this.msgListService.findSentMsg(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    create(@Body() data: MsgCreateCreateDto){
        return this.msgListService.create(data);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    delete(@Param() id: number){
        return this.msgListService.delete(id);
    }
}
