import { IsDate, IsDateString, IsDefined, IsNotEmpty, IsNumber } from "class-validator";
import { MsgListCreateDto } from "./msg-list-create.dto";

export class MsgListUpdateDto extends (MsgListCreateDto) {
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}