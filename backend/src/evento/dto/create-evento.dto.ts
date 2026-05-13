import { IsString, IsNotEmpty ,IsDateString} from "class-validator"; 

export class CreateEventoDto {
    @IsString({ message: "Onibus ID é obrigatório" })
    @IsNotEmpty({ message: "Onibus ID não pode ser vazio" })
    onibusId!: string;

    @IsString({ message: "Parada ID é obrigatório" })
    @IsNotEmpty({ message: "Parada ID não pode ser vazio" })
    paradaId!: string;

    @IsDateString({ message: "Timestamp deve ser uma data válida" })
    @IsNotEmpty({ message: "Timestamp não pode ser vazio" })
    timestamp!: string;
}