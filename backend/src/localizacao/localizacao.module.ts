import { Module } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { LocalizacaoController } from './localizacao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Localizacao, LocalizacaoSchema } from 'src/schemas/localizacao.schemas';
import { Parada, ParadaSchema } from 'src/schemas/parada.schemas';
import { Evento, EventoSchema } from 'src/schemas/evento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Localizacao.name, schema: LocalizacaoSchema },
      { name: Parada.name, schema: ParadaSchema },
      { name: Evento.name, schema: EventoSchema },
    ])
  ],
  providers: [LocalizacaoService],
  controllers: [LocalizacaoController]
})
export class LocalizacaoModule {}
