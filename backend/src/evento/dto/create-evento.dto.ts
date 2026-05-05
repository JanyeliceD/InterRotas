import { IsNumber, IsString } from "class-validator"; 

export class CreateEventoDto {
    @IsNumber()
    onibusId!: number;

    @IsNumber()
    paradaId!: number;

    @IsString()
    timestamp!: string;
}