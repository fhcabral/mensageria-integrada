import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FuncUsuario } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(FuncUsuario)
    private readonly userRepository: Repository<FuncUsuario>,
  ) {}
  async findUser(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
      });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
