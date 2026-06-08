import { Module } from '@nestjs/common';
import { MotoristaController } from './motorista.controller';
import { MotoristaService } from './motorista.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Motorista, MotoristaSchema } from '../schemas/motorista.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Motorista.name, schema: MotoristaSchema }
    ])
  ],
  controllers: [MotoristaController],
  providers: [MotoristaService]
})
export class MotoristaModule {}
