import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SAMEL.FUNC_USUARIO' })
export class FuncUsuario {
  @PrimaryGeneratedColumn({ name: 'CD_PESSOA_FISICA' })
  id: number;

  @Column({ name: 'NM_USUARIO' })
  username: string;

  @Column({ name: 'DS_USUARIO' })
  name: string;

  @Column({ name: 'DS_SENHA' })
  password: string;
}
