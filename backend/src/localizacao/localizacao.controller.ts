import { 
  Controller, 
  Post, 
  Body,
  Get,
  Param,
  Delete,
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
  
  @Get('onibus/:idOnibus')
  listarPorOnibus(@Param('idOnibus') idOnibus: string) {
      return this.localizacaoService.listarPorOnibus(idOnibus);
  }

  @Get('historico')
  listarHistorico() {
    return this.localizacaoService.listarHIstorico();
  }

  @Get()
  listar() {
      return this.localizacaoService.listarUltimasLocalizacoes();
  }

  @Get('historico/:idOnibus')
  listarHistoricoOnibus(@Param('idOnibus') idOnibus: string) {
      return this.localizacaoService.listarHistoricoOnibus(idOnibus);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.localizacaoService.remover(id);
  }
}