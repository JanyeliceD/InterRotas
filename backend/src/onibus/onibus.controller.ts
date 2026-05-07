import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { OnibusService } from './onibus.service';
import { CreateOnibusDto } from './dto/create-onibus.dto';

@Controller('onibus')
export class OnibusController {
    constructor(private readonly onibusService: OnibusService) {}

    @Get()
    listar() {
        return this.onibusService.listar();
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        return this.onibusService.buscarPorId(id);
    }

    @Post()
    criar(@Body() data: CreateOnibusDto) {
        return this.onibusService.criar(data);
    }
}
