export interface ILogin {
    username: string
    password: string
}

export interface ILoginResult {
    token: string,
    username: string,
    fullname: string
}