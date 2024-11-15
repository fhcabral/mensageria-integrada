import type { $Fetch } from "ofetch";
import type { IRecipientReport } from "../recipients/types";

export class ReportService {
    private fetch: $Fetch;

    constructor(fetch: any) {
        this.fetch = fetch;
    }
    async gerarRelatorioMensagens(data: IRecipientReport[]) {
        const result = await this.fetch(`/report`, {
            method: "POST",
            body: data
          });
      
          return result;
    }
}