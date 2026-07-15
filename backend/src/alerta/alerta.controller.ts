import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';

@Controller('alerta')
export class AlertaController {
  constructor(
    private readonly alertaService: AlertaService,
    // Removemos o RotasService porque a lógica agora roda dentro do AlertaService!
  ) {}

  @Get()
  listar() {
    return this.alertaService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.alertaService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: CreateAlertaDto) {
    return this.alertaService.criar(body);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() body: UpdateAlertaDto) {
    return this.alertaService.atualizar(id, body);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.alertaService.remover(id);
  }

  // 🟢 Rota de rastreio com sintaxe corrigida e chaves organizadas!
  @Post(':id/rastreio')
  async atualizarRastreio(
    @Param('id') idRota: string,
    @Body() body: { latitude: number; longitude: number; idOnibus: string; idRota: string;tipo: 'DESVIO_ROTA' | 'ATRASO' | 'LOTACAO' | 'OUTRO' },
  ) {
    return await this.alertaService.criar({
      idOnibus: body.idOnibus,
      idRota: body.idRota,
      tipo: 'DESVIO_ROTA', // Tipo de alerta fixo para rastreio
      latitudeAtual: body.latitude,
      longitudeAtual: body.longitude,
    });
  }
}