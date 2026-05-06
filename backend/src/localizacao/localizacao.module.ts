import { Module } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { LocalizacaoController } from './localizacao.controller';

@Module({
  providers: [LocalizacaoService],
  controllers: [LocalizacaoController]
})
export class LocalizacaoModule {}
