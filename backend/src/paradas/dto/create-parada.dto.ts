import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateParadaDto {
    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsArray()
    local!: Array<string>;

    @IsNumber()
    latitude!: number;

    @IsNumber()
    longitude!: number;
}