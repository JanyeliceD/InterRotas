import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { OnibusService } from './onibus.service';

@Controller('onibus')
export class OnibusController {
    constructor(private readonly onibusService: OnibusService) {}

    @Get()
    listar() {
        return this.onibusService.listar();
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        const idNumero = Number(id);
        return this.onibusService.buscarPorId(idNumero);
    }

    @Post()
    criar(@Body() data: any) {
        return this.onibusService.criar(data);
    }
}
