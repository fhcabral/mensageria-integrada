import type { $Fetch } from "ofetch";
import type { ICreateList, IUpdateList } from "./types";

export class ListService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch;
  }

  async getList() {
    const result = await this.fetch("/msg-list/list", {
      method: "GET",
    });

    return result;
  }

  async createList(data: ICreateList) {
    const result = await this.fetch("/msg-list/create", {
      method: "POST",
      body: data,
    });

    return result;
  }

  async deleteList(id: number) {
    const result = await this.fetch(`/msg-list/delete/${id}`, {
      method: "DELETE",
    });

    return result;
  }

  async editList(data: IUpdateList) {
    const result = await this.fetch(`/msg-list/update/`, {
      method: "PATCH",
      body: data,
    });

    return result;
  }
}
