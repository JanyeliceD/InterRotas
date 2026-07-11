import { IsString, IsOptional, IsNumber } from 'class-validator'; 

export class UpdateRotaDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  idMotorista?: string;

  @IsString()
  @IsOptional()
  idOnibus?: string;

  @IsNumber()
  @IsOptional()
  quilometragem?: number;
}