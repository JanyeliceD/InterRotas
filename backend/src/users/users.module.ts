import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { usersController } from './users.controller';
import { usersService } from './users.service';
import { Usuario, UsuarioSchema } from '../schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  controllers: [usersController],
  providers: [usersService],
})
export class usersModule {}