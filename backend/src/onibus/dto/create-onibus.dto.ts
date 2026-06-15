import { IsString, IsNotEmpty, IsNumber, IsMongoId } from "class-validator"; 

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

    @IsString({ message: "ID da Rota é obrigatório" })
    @IsNotEmpty({ message: "ID da Rota não pode ser vazio" })
    @IsMongoId({ message: "ID da Rota deve ser um ID válido" })
    idRota!: string;
}