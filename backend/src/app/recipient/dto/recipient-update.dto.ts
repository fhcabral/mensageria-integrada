import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class recipientDtoUpdate {
    @IsNotEmpty()
    @IsDefined()
    @IsNumber()
    id: number

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    fist_name: string

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    full_name: string

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    telephone: string

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    username: string
}
