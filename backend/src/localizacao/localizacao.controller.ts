import { 
  Controller, 
  Post, 
  Body,
  Get,
  Param
} from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { CreateLocalizacaoDto } from './dto/create-localizacao.dto';

@Controller('localizacao')
export class LocalizacaoController {
  constructor(private readonly localizacaoService: LocalizacaoService) {}

  @Post()
  receber(@Body() body: CreateLocalizacaoDto) {
    return this.localizacaoService.processarLocalizacao(body);
  }
  
  @Get('onibus/:onibusId')
  buscarUltima(@Param('onibusId') onibusId: string) {
    return this.localizacaoService.buscarUltimaLocalizacao(onibusId);
  }
}