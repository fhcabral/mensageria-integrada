import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class MsgListCreateDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    list_name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string;
}