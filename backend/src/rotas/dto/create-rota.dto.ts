import { IsNotEmpty, IsString, IsArray , ArrayMinSize, IsMongoId} from 'class-validator';

export class CreateRotaDto {
    @IsString({ message: "Nome é obrigatório" })
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    nome!: string;
    
    @IsString({ message: "ID do Ônibus é obrigatório" })
    @IsNotEmpty({ message: "ID do Ônibus não pode ser vazio" })
    @IsMongoId()
    idOnibus!: string;

    @IsString({ message: "Motorista é obrigatório" } )
    @IsNotEmpty({ message: "O campo motorista não pode ser vazio" })
    @IsMongoId()
    idMotorista!: string;

    @IsArray({ message: "Paradas é obrigatório" })
    @ArrayMinSize(2, { message: " A Rota deve ter pelo menos 2 paradas" })
    @IsString({ each: true, message: "Cada parada deve ser uma string" })
    @IsMongoId({ each: true })
    paradas!: string[];
}