import { IsNotEmpty, IsNumber, IsString, IsArray, Min,Max ,ValidateNested} from 'class-validator';
import { LocalDto } from './create-local.dto';
import { Type } from 'class-transformer';
export class CreateParadaDto {
    @IsString({ message: "Nome é obrigatório" })
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    nome!: string;

    @ValidateNested()
    @Type(() => LocalDto)
    @IsNotEmpty({ message: "Local não pode ser vazio" })
    local!: LocalDto;

    @IsNumber( {},{ message: "Latitude é obrigatória" })
    @Min(-90,{ message: "Latitude mínima é -90 " })
    @Max(90,{ message: "Latitude máxima é 90 " })
    @IsNotEmpty({ message: "Latitude não pode ser vazio" })
    latitude!: number;

    @IsNumber( {},{ message: "Longitude é obrigatória" })
    @Min(-180,{ message: "Longitude mínima é -180 " })
    @Max(180,{ message: "Longitude máxima é 180 " })
    @IsNotEmpty({ message: "Longitude não pode ser vazio" })
    longitude!: number;
}