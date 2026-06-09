import { IsString, IsNotEmpty, IsDateString, IsMongoId, IsOptional } from "class-validator"; 

export class CreateAlertaDto {
    @IsString({ message: "Onibus ID é obrigatório" })
    @IsNotEmpty({ message: "Onibus ID não pode ser vazio" })
    @IsMongoId({ message: "Onibus ID deve ser um ID válido" })
    onibusId!: string;

    @IsString({ message: "Tipo é obrigatório" })
    @IsNotEmpty({ message: "Tipo não pode ser vazio" })
    tipo!: 'DESVIO_ROTA' | 'ATRASO' | 'LOTACAO' | 'OUTRO';

    @IsString({ message: "Nível é obrigatório" })
    @IsNotEmpty({ message: "Nível não pode ser vazio" })
    nivel!: 'BAIXO' | 'MEDIO' | 'ALTO';

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsDateString( {}, {message: "Data de criação deve ser uma data válida" })
    @IsNotEmpty({ message: "Data de criação não pode ser vazio" })
    dataCriacao!: Date;
}