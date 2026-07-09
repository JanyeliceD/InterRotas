import { IsString, IsNotEmpty, IsNumber } from "class-validator"; 

export class CreateOnibusDto {
    @IsString({ message: "Placa é obrigatória" })
    @IsNotEmpty({ message: "Placa não pode ser vazio" })
    placa!: string;

    @IsString({ message: "Modelo é obrigatório" })
    @IsNotEmpty({ message: "Modelo não pode ser vazio" })
    modelo!: string;

    @IsNumber({}, { message: "Capacidade deve ser um número" })
    @IsNotEmpty({ message: "Capacidade não pode ser vazio" })
    capacidade!: number;
}