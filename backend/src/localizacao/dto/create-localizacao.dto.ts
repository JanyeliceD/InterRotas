import {  IsNumber, IsString } from 'class-validator';

export class CreateLocalizacaoDto {
    @IsString()
    onibusId!: string;

    @IsNumber()
    latitude!: number;

    @IsNumber()
    longitude!: number;
}