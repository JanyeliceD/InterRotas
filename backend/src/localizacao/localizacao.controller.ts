import { Controller, Post, Body } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { CreateLocalizacaoDto } from './dto/create-localizacao.dto';

@Controller('localizacao')
export class LocalizacaoController {
  constructor(private readonly localizacaoService: LocalizacaoService) {}

  @Post()
  receber(@Body() body: CreateLocalizacaoDto) {
    return this.localizacaoService.processarLocalizacao(body);
  }
  
}