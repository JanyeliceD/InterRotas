// O Garçom: Recebe o pedido e entrega a resposta
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { usersService } from './users.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class usersController {
  // O Controller recebe o Service pelo construtor (Injeção de Dependência)
  constructor(private readonly usersService: usersService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async entrar(@Body() loginDto: LoginDto) {
    // Repassa os dados recebidos do React Native para o Service trabalhar
    return this.usersService.validarUsuario(loginDto.usuario, loginDto.senha);
  }
}