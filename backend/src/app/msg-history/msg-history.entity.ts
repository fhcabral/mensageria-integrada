import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SAMEL.MSG_HISTORY_WP' })
export class MsgHistoryWpEntity {
  @PrimaryGeneratedColumn({ name: "ID_MENSAGEM" })
    idMensagem: number;

    @Column({ name: "NR_SEQUENCIA" })
    nrSequencia: number;

    @Column({ name: "DS_MENSAGEM", type: "clob" })
    dsMensagem: string;

    @Column({ name: "TP_ORIGEM", length: 1 })
    tpOrigem: string;

    @Column({ name: "DT_MENSAGEM", type: "timestamp"})
    dtMensagem: Date;
}
