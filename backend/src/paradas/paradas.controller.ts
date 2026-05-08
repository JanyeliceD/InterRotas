import {Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ParadasService } from './paradas.service';
import { CreateParadaDto } from './dto/create-parada.dto';

@Controller('paradas')
export class ParadasController {
    constructor (private readonly paradaService: ParadasService ) {}

    @Get() 
    listar() {
        return this.paradaService.listar();
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        return this.paradaService.buscarPorId(id);
    }

    @Post()
    criar(
        @Body() dados: CreateParadaDto) {
        return this.paradaService.criar(dados);
    }
}