import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from '../schemas/users.schema';

@Injectable()
export class usersService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

 
  async validarUsuario(usuarioInserido: string, senhaInserida: string) {
    const usuarioLimpo = usuarioInserido.trim().toLowerCase();

    // 1. Busca no MongoDB se existe alguém com o "usuario" digitado
    const conta = await this.usuarioModel.findOne({ usuario: usuarioLimpo });

    // 2. Se não encontrar o usuário ou a senha estiver errada, barra o login
    if (!conta || conta.senha !== senhaInserida) {
      throw new UnauthorizedException('Usuário ou senha incorretos.');
    }

    // 3. Se deu certo, envia o token e a role cadastrada (admin ou motorista)
    return {
      token: 'TOKEN_PROVISORIO_JWT',
      role: conta.role,
    };
  }
}