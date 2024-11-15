import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { WebhookWpService } from './webhook-wp.service';
import { SendMessageDto, startMessageNumberDto } from './dto/verific-webhook.dto';

@Controller('webhook')
export class WebhookWpController {
    constructor (private readonly serviceWebhook: WebhookWpService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getWebhook(@Query('hub.mode') hub_mode: any, @Query('hub.challenge') hub_challenge: any, @Query('hub.verify_token') hub_verify_token: any) {
        return this.serviceWebhook.getWebhook({hub_mode, hub_challenge, hub_verify_token});
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    postWebhook(@Body() data: any) {
        return this.serviceWebhook.postWebhook(data);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/sendMessage')
    postSendMessage(@Body() data: SendMessageDto) {
        return this.serviceWebhook.sendMessage(data);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/sendStartedMessage')
    async postSendStartedMessage(@Body() data: startMessageNumberDto) {
        return await this.serviceWebhook.sendStartedTemplate(data);
    }

}
