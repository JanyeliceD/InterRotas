import {
    Controller, 
    Get, 
    Param, 
    Post, 
    Body,
    Patch,
    Delete
} from '@nestjs/common';
import { ParadasService } from './paradas.service';
import { CreateParadaDto } from './dto/create-parada.dto';
import { UpdateParadaDto } from './dto/update-parada.dto';

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

    @Patch(':id')
    atualizar(
        @Param('id') id: string,
        @Body() dados: UpdateParadaDto
    ) {
        return this.paradaService.atualizar(id, dados);
    }

    @Delete(':id')
    remover(
        @Param('id') id: string
    ) {
        return this.paradaService.remover(id);
    }
}