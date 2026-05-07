import { Module } from '@nestjs/common';
import { EventoController } from './evento.controller';
import { EventoService } from './evento.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Evento, EventoSchema } from '../schemas/evento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Evento.name, schema: EventoSchema }
    ])
  ],
  controllers: [EventoController],
  providers: [EventoService]
})
export class EventoModule {}
