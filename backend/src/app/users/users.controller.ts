import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
    constructor (private readonly userService: UsersService) { }

    @HttpCode(HttpStatus.OK)
    @Get('/:username')
    findUser(@Param('username') username: string) {
        return this.userService.findUser(username);
    }
}
