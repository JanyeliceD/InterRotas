import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsNumber } from 'class-validator';

export class CreateRotaDto {
    @IsString({ message: "O código da rota deve ser um texto" })
    @IsNotEmpty({ message: "O código da rota é obrigatório" })
    codigo!: string; // 🟢 Adicionado para aceitar "ROTA003"

    @IsString({ message: "Nome é obrigatório" })
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    nome!: string;
    
    @IsString({ message: "ID do Ônibus é obrigatório" })
    @IsNotEmpty({ message: "ID do Ônibus não pode ser vazio" })
    // 🟢 Removido o @IsMongoId() para aceitar a placa ou texto comum
    idOnibus!: string;

    @IsString({ message: "Motorista é obrigatório" })
    @IsNotEmpty({ message: "O campo motorista não pode ser vazio" })
    // 🟢 Removido o @IsMongoId() para aceitar o nome do motorista em formato de texto
    idMotorista!: string;

    @IsString({ message: "O campo motorista (auxiliar) deve ser um texto" })
    @IsNotEmpty({ message: "O campo motorista (auxiliar) não pode ser vazio" })
    motorista!: string; // 🟢 Adicionado para aceitar o campo duplicado que seu banco possui

    @IsArray({ message: "Paradas é obrigatório" })
    @ArrayMinSize(2, { message: "A Rota deve ter pelo menos 2 paradas" })
    @IsString({ each: true, message: "Cada parada deve ser uma string" })
    // 🟢 Removido o @IsMongoId({ each: true }) para evitar conflitos com os IDs vindos do front
    paradas!: string[];

    @IsNumber({}, { message: "A quilometragem deve ser um número válido" })
    @IsNotEmpty({ message: "A quilometragem é obrigatória" })
    quilometragem!: number; // 🟢 Adicionado para aceitar o "97" que vem do mobile
}