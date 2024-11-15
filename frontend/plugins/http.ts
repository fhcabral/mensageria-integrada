import { LoginService } from "~/services/login";
import { ListService } from "~/services/msg-list";
import { RecipientsService } from "~/services/recipients";
import { UserService } from "~/services/user";
import { MsgHistoryService } from "~/services/msg-history";
import { authStorage } from "~/store/auth/store";
import io from 'socket.io-client'
import { ReportService } from "~/services/report/index";

interface IHttp {
  user: UserService;
  login: LoginService;
  list: ListService;
  recipient: RecipientsService;
  MsgHistory: MsgHistoryService;
  report: ReportService;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const fetcher = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options }) {
      const authHeader = {
        Authorization: "Bearer " + authStorage().token,
      };
      options.headers = Object.assign(authHeader, options.headers);
    },
  });

  const socket = io('http://localhost:3001', {
    autoConnect: false,
  });

  const httpServices: IHttp = {
    user: new UserService(fetcher),
    login: new LoginService(fetcher),
    list: new ListService(fetcher),
    recipient: new RecipientsService(fetcher),
    MsgHistory: new MsgHistoryService(fetcher),
    report: new ReportService(fetcher)
  };

  return {
    provide: {
      http: httpServices,
      socket: socket,
    },
  };
});
