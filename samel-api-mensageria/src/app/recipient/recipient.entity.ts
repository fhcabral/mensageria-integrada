import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SAMEL.MSG_DESTINATARIOS_WP' })
export class RecipentsEntity {
  @PrimaryGeneratedColumn({ name: 'NR_SEQUENCIA' })
  id: number;

  @Column({ name: 'NM_PESSOA_SIMPLES' })
  fist_name: string;

  @Column({ name: 'NM_PESSOA_FISICA' })
  full_name: string;

  @Column({name: 'NR_CONTATO'})
  telephone: string;

  @Column({ name: 'DT_CRIACAO' })
  date_create: Date;

  @Column({ name: 'DT_ATUALIZACAO' })
  date_update: Date;

  @Column({ name: 'NM_USUARIO' })
  username: string;

  @Column({ name: 'CD_LISTA_WP' })
  nr_list: string;

  @Column({ name: 'IE_SITUACAO' })
  situation: string;

  @Column({ name: 'CD_PESSOA_FISICA' })
  person_code: number;
}
