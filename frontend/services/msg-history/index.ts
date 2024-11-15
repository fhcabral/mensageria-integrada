import type { $Fetch } from "ofetch";
import type { IConversation, ISendMessage } from "./types";

export class MsgHistoryService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch;
  }

  async getMsg(id: number) {
    const result = await this.fetch(`/msg-history/${id}`, {
      method: "GET",
    });

    return result;
  }

  async getMsgSentForContacts(id: number) {
    const result = await this.fetch(`/msg-history/sent-msg/${id}`, {
      method: "GET",
    });

    return result;
  }

  async createMsg(data: IConversation) {
    const result = await this.fetch("/msg-history/create", {
      method: "POST",
      body: data,
    });

    return result;
  }

  async sendWhatsAppMessage(data: ISendMessage) {
    const result = await this.fetch("/webhook/sendMessage", {
      method: "POST",
      body: data
    })
    return result;
  }

  async sendAllWhatsappMessage(data: any) {
    const result = await this.fetch("/webhook/sendStartedMessage", {
      method: "POST",
      body: data
    })
    return result;
  }

}
