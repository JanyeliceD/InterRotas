import { IsString, IsOptional, IsNumber } from 'class-validator'; // 👈 Adicione IsNumber aqui

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

  @IsNumber() // 👈 Garante que o NestJS valide como número
  @IsOptional()
  quilometragem?: number; // 👈 Adicionado aqui
}