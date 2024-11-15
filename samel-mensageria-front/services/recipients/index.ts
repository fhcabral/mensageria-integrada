import type { $Fetch } from "ofetch";
import type { IRecipientsCreate } from "./types";

export class RecipientsService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch;
  }

  async getList(sequence: number) {
    const result = await this.fetch(`/recipient/list/${sequence}`, {
      method: "GET",
    });

    return result;
  }

  async createRecipient(data: IRecipientsCreate) {
    const result = await this.fetch(`/recipient/create`, {
      method: "POST",
      body: data,
    });

    return result;
  }

  async deleteRecipient(id: number) {
    const result = await this.fetch(`/recipient/delete/${id}`, {
      method: "DELETE",
    });

    return result;
  } 

  async updateRecipient(data: IRecipientsCreate) {
    const result = await this.fetch(`/recipient/update`, {
      method: "PATCH",
      body: data,
    });

    return result;
  }
}
