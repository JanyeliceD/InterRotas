import { Module } from '@nestjs/common';
import { AlertaController } from './alerta.controller';
import { AlertaService } from './alerta.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Alerta, AlertaSchema } from '../schemas/alerta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Alerta.name, schema: AlertaSchema }
    ])
  ],
  controllers: [AlertaController],
  providers: [AlertaService]
})
export class AlertaModule {}
