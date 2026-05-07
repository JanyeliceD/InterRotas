import { IsString } from "class-validator"; 

export class CreateOnibusDto {
    @IsString()
    placa!: string;

    @IsString()
    modelo!: string;

    @IsString()
    idRota!: string;
}