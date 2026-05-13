import { IsNotEmpty, IsNumber, IsString, IsArray ,ArrayMinSize} from 'class-validator';

export class CreateRotaDto {
    @IsString({ message: "ID do Ônibus é obrigatório" })
    @IsNotEmpty({ message: "ID do Ônibus não pode ser vazio" })
    idOnibus!: string;

    @IsString({ message: "Nome é obrigatório" })
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    nome!: string;

    @IsArray({ message: "Paradas é obrigatório" })
    @ArrayMinSize(2, { message: " A Rota deve ter pelo menos 2 paradas" })
    @IsString({ each: true, message: "Cada parada deve ser uma string" })
    paradas!: string[];

    @IsString({ message: "Motorista é obrigatório" } )
    @IsNotEmpty({ message: "O campo motorista não pode ser vazio" })
    motorista!: string;

    @IsNotEmpty({ message: "Origem não pode ser vazio" })
    @IsString({ message: "Origem é obrigatória" }   )
    origem!: string;

    @IsNotEmpty({ message: "Destino não pode ser vazio" })
    @IsString({ message: "Destino é obrigatório" })
    destino!: string;
}