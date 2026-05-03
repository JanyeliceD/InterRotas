import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { EventoService } from './evento.service';

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
  criar(@Body() data: any) {
    return this.eventoService.criar(data);
  }
}