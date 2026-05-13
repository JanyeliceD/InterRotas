import { IsString,IsNotEmpty } from "class-validator"; 

export class CreateOnibusDto {
    @IsString({ message: "Placa é obrigatória" })
    @IsNotEmpty({ message: "Placa não pode ser vazio" })
    placa!: string;

    @IsString({ message: "Modelo é obrigatório" })
    @IsNotEmpty({ message: "Modelo não pode ser vazio" })
    modelo!: string;

    @IsString({ message: "ID da Rota é obrigatório" })
    @IsNotEmpty({ message: "ID da Rota não pode ser vazio" } )
    idRota!: string;
}