import type { $Fetch } from "ofetch";

export class UserService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch;
  }

  async getUserData() {
    const result = await this.fetch('/')
  }
}
