import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateRotaDto {
    @IsString()
    idOnibus!: string;

    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsArray()
    paradas!: Array<string>;

    @IsString()
    motorista!: string;

    @IsNotEmpty()
    @IsString()
    origem!: Array<string>;

    @IsNotEmpty()
    @IsString()
    destino!: Array<string>;
}