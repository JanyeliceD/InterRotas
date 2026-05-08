import { IsNumber, IsString } from "class-validator"; 

export class CreateEventoDto {
    @IsString()
    onibusId!: string;

    @IsString()
    paradaId!: string;

    @IsString()
    timestamp!: string;
}