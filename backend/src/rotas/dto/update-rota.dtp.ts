import { IsString, IsOptional, IsNumber } from 'class-validator'; 

export class UpdateRotaDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  motorista?: string;

  @IsString()
  @IsOptional()
  onibus?: string;

  @IsNumber()
  @IsOptional()
  quilometragem?: number;
}