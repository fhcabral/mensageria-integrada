import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MsgListService } from './msg-list.service';
import { MsgListCreateDto } from './dto/msg-list-create.dto';
import { MsgListUpdateDto } from './dto/msg-list-update.dto';

@Controller('msg-list')
export class MsgListController {
   constructor (private readonly msgListService: MsgListService) { }

    @HttpCode(HttpStatus.OK)
    @Get('list')
    findAll(){
        return this.msgListService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get('list/:id') 
    findOne(id: number){
        return this.msgListService.findOne(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    create(@Body() data: MsgListCreateDto){
        return this.msgListService.create(data);
    }

    @HttpCode(HttpStatus.OK)
    @Patch('update')
    update(@Body() data: MsgListUpdateDto){
        return this.msgListService.update(data);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.msgListService.delete(id);
    }
}
