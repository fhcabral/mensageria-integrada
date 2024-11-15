import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';

@Entity({ name: 'sysdate_query' })
export class SysdateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  SYSDATE: Date;
}

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(SysdateEntity)
    private readonly repository: Repository<SysdateEntity>,
  ) {}

  public async getDatabaseDate(): Promise<Date> {
    const result = await this.repository.query('SELECT SYSDATE FROM DUAL');

    const sysdate = result[0]?.SYSDATE || null;

    return sysdate;
  }
}
