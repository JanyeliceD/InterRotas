import { 
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Patch,
    Body,
 } from '@nestjs/common';
import { OcorrenciaService } from './ocorrencia.service';
import { CreateOcorrenciaDto } from './dto/create-ocorrencia.dto';
import { UpdateOcorrenciaDto } from './dto/update-ocorrencia.dto';

@Controller('ocorrencia')
export class OcorrenciaController {
    constructor(private readonly ocorrenciaService: OcorrenciaService) {}

    @Get()
    listar() {
        return this.ocorrenciaService.listar();
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        return this.ocorrenciaService.buscarPorId(id);
    }

    @Post()
    criar(@Body() data: CreateOcorrenciaDto) {
        return this.ocorrenciaService.criar(data);
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() data: UpdateOcorrenciaDto) {
        return this.ocorrenciaService.atualizar(id, data);
    }

    @Delete(':id')
    remover(@Param('id') id: string) {
        return this.ocorrenciaService.remover(id);
    }
}
