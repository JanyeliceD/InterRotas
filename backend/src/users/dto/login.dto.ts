import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'O usuário é obrigatório.' })
  readonly usuario!: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  readonly senha!: string;
}