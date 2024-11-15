import { IsBoolean, IsDefined, IsNumber, IsString, IsNotEmpty } from "class-validator";


export class RecipientReportDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    telefone: string;


    @IsNotEmpty()
    @IsNumber()
    cpf: number;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean

  }