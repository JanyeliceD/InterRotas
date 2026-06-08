import { IsNotEmpty, IsString, IsMongoId, IsOptional } from "class-validator";

export class CreateOcorrenciaDto {
    @IsString({ message: "ID do Ônibus é obrigatório" })
    @IsNotEmpty({ message: "ID do Ônibus não pode ser vazio" })
    @IsMongoId({ message: "ID do Ônibus deve ser um ID válido" })
    idOnibus!: string;

    @IsString()
    @IsNotEmpty({ message: "Tipo é obrigatório" })
    tipo!: 'FALHA_MECANICA' | 'PNEU_FURADO' | 'ACIDENTE' | 'TRANSITO' | 'OUTRO';

    @IsOptional()
    @IsString()
    descricao?: string;
}