import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FuncUsuario } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jetService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    let user: FuncUsuario;
    try {
      user = await this.userService.findUser(username);
    } catch (error) {
      return null;
    }

    if (user.password !== password) return null;

    return user;
  }

  async login(user: FuncUsuario) {
    const payload = { sub: user.id, username: user.username };

    return {
      token: this.jetService.sign(payload),
      username: user.username,
      fullname: user.name
    };
  }
}
