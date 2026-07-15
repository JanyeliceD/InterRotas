import { Module } from '@nestjs/common';
import { AlertaController } from './alerta.controller';
import { AlertaService } from './alerta.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Alerta, AlertaSchema } from '../schemas/alerta.schema';
import { RotaSchema } from '../schemas/rota.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Alerta.name, schema: AlertaSchema },
      { name: 'Rota', schema: RotaSchema }
    ])
  ],
  controllers: [AlertaController],
  providers: [AlertaService]
})
export class AlertaModule {}
