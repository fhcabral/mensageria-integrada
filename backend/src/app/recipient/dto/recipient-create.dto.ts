import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class recipientDTO{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    list_base64: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    list_code: string;
}   