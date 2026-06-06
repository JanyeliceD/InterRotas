import { 
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Patch,
    Body,
 } from '@nestjs/common';
 import { MotoristaService } from './motorista.service';
 import { CreateMotoristaDto } from './dto/create-motorista.dto';
 import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Controller('motorista')
export class MotoristaController {
    constructor(private readonly motoristaService: MotoristaService) {}

    @Get()
    listar() {
        return this.motoristaService.listar();
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        return this.motoristaService.buscarPorId(id);
    }

    @Post()
    criar(@Body() data: CreateMotoristaDto) {
        return this.motoristaService.criar(data);
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() data: UpdateMotoristaDto) {
        return this.motoristaService.atualizar(id, data);
    }

    @Delete(':id')
    remover(@Param('id') id: string) {
        return this.motoristaService.remover(id);
    }
} 
