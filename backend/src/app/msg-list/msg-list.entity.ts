import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SAMEL.MSG_LISTAS' })
export class ListEntity {
  @PrimaryGeneratedColumn({ name: 'NR_SEQUENCIA' })
  id: number;

  @Column({ name: 'DS_LISTA' })
  list_name: string;

  @Column({ name: 'DT_CRIACAO' })
  date_create: string;

  @Column({ name: 'DT_ATUALIZACAO' })
  date_update: Date;

  @Column({ name: 'NM_USUARIO' })
  username: string;
}
