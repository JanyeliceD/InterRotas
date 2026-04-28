import { Controller, Get, Param, Post, Body, BadRequestException } from '@nestjs/common';
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
    const idNumero = Number(id);

    if (Number.isNaN(idNumero)) {
      throw new BadRequestException('ID deve ser um número');
    }

    return this.eventoService.buscarPorId(idNumero);
  }

  @Post()
  criar(@Body() data: any) {
    return this.eventoService.criar(data);
  }
}