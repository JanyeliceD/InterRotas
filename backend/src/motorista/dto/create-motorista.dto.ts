import { IsNotEmpty, IsString } from "class-validator";

export class CreateMotoristaDto {
    @IsString({ message: "Nome é obrigatório" })
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    nome!: string;

    @IsString({ message: "CPF é obrigatório" })
    @IsNotEmpty({ message: "CPF não pode ser vazio" })
    cpf!: string;

    @IsString({ message: "CNH é obrigatória" })
    @IsNotEmpty({ message: "CNH não pode ser vazio" })
    cnh!: string;

    @IsString({ message: "Email é obrigatório" })
    @IsNotEmpty({ message: "Email não pode ser vazio" })
    email!: string;

    @IsString({ message: "Telefone é obrigatório" })
    @IsNotEmpty({ message: "Telefone não pode ser vazio" })
    telefone!: string;
}