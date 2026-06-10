import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';

@Controller('alerta')
export class AlertaController {
  constructor(private readonly alertaService: AlertaService) {}

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
}