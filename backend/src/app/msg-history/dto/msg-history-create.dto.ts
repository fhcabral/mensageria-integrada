import { IsString, IsDefined, IsNotEmpty, IsNumber } from "class-validator";
import { ChatMsgDto } from "./msg-history-chat.dto";

export class MsgCreateCreateDto {
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    contactId: number;

    @IsDefined()
    @IsNotEmpty()
    messages: ChatMsgDto;
}