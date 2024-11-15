export interface IListMsg {
  id: number;
  list_name: string;
  date_create: string;
  date_update: string;
  username: string;
}

export interface ICreateList {
  list_name: string;
  username?: string;
}

export interface IUpdateList {
  id: number;
  list_name: string;
  username: string;
}