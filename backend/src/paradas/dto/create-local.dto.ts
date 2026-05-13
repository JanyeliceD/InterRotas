import { IsString, IsNotEmpty } from 'class-validator';

export class LocalDto {
    @IsString({ message: "Rua é obrigatória" })
    @IsNotEmpty({ message: "Rua não pode ser vazio" })
    rua!: string;

    @IsString({ message: "Bairro é obrigatório" })
    @IsNotEmpty({ message: "Bairro não pode ser vazio" })
    bairro!: string;

    @IsString({ message: "Cidade é obrigatória" })
    @IsNotEmpty({ message: "Cidade não pode ser vazio" })
    cidade!: string;
}