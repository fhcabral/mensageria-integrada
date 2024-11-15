import type { IRecipientsCreate } from "~/services/recipients/types";
import { authService } from "~/services/authServices";

const username = authService.getUsername();

export const mount_json_list = ({ list_name, id }: any,type: string): any => {
  const jsonBase = { list_name, username: username, id};
  if (type === "edit") {
    return jsonBase;
  } else {
    const { id, ...rest } = jsonBase;
    return { ...rest };
  }
};

export const mount_json_recipient = ({
  list_base64, list_code
}: IRecipientsCreate): IRecipientsCreate => {
  const jsonBase = {
    list_code,
    list_base64,
    username: username || undefined,
  };
  return jsonBase;
};

export const mount_json_update_recipient = ({ id, fist_name, full_name, telephone }: any): any => {
  return { id, fist_name, full_name, telephone, username: username };
};