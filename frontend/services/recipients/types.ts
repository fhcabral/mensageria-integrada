export interface IRecipientsCreate {
    list_base64: string
    username?: string
    list_code: string
}

export interface IRecipient {
  id: number;
  fist_name: string;
  full_name: string;
  telephone: string;
  date_create: string;
  date_update: string;
  username: string;
  nr_list: number;
  situation: string;
  person_code: number;
}

export interface IRecipientReport {
  id: number
  nome: string;
  telefone: string;
  cpf: number;
  status: boolean
}

export interface IRecipientsUpdate {
  id: number;
  fist_name: string;
  full_name: string;
  telephone: string;
  username: string;
}