import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';

import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  listar() {
    return this.eventoService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.eventoService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: CreateEventoDto) {
    return this.eventoService.criar(body);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() body: UpdateEventoDto) {
    return this.eventoService.atualizar(id, body);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.eventoService.remover(id);
  }
}