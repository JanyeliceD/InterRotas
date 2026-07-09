import { IsNumber, IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateLocalizacaoDto {
    @IsString({ message: "Onibus ID é obrigatório" })
    @IsNotEmpty({ message: "Onibus ID não pode ser vazio" })
    @IsMongoId({ message: "Onibus ID deve ser um ID válido" })
    idOnibus!: string;

    @IsNumber({}, { message: "Latitude é obrigatória" })
    @IsNotEmpty({ message: "Latitude não pode ser vazio" })
    latitude!: number;

    @IsNumber({}, { message: "Longitude é obrigatória" })
    @IsNotEmpty({ message: "Longitude não pode ser vazio" })
    longitude!: number;
}