import { IsBoolean, IsDefined, IsNotIn, IsString } from "class-validator";

export class ChatMsgDto {
    @IsDefined()
    @IsNotIn([null, undefined])
    @IsString()
    text: string;

    @IsBoolean()
    sent: boolean;

    @IsString()
    time: string

    @IsString()
    type: string
}