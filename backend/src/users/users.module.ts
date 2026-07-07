import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Importe o Mongoose
import { usersController } from './users.controller';
import { usersService } from './users.service';
import { Usuario, UsuarioSchema } from '../schemas/users.schema'; // Importe seu novo Schema

@Module({
  imports: [
    // Registra o Schema de Usuários para o módulo de autenticação usar
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [usersController],
  providers: [usersService],
})
export class usersModule {}