import type { $Fetch } from "ofetch";
import type { ILogin } from "./types";

export class LoginService {
  private fetch: $Fetch;

  constructor(fetch: any) {
    this.fetch = fetch;
  }

  async loginUser(data: ILogin) {
    const result = await this.fetch('/auth/login', {
        method: "POST",
        body: data
    })

    return result
  }
}
