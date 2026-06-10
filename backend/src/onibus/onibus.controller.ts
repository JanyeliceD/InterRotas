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
import { OnibusService } from './onibus.service';
import { CreateOnibusDto } from './dto/create-onibus.dto';
import { UpdateOnibusDto } from './dto/update-onibus.dto';

@Controller('onibus')
export class OnibusController {
    constructor(private readonly onibusService: OnibusService) {}

    @Get()
    listar(
        @Query('placa') placa?: string,
        @Query('modelo') modelo?: string,
    ) {
        return this.onibusService.listar(placa, modelo);
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        return this.onibusService.buscarPorId(id);
    }

    @Post()
    criar(@Body() data: CreateOnibusDto) {
        return this.onibusService.criar(data);
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() data: UpdateOnibusDto) {
        return this.onibusService.atualizar(id, data);
    }

    @Delete(':id')
    remover(@Param('id') id: string) {
        return this.onibusService.remover(id);
    }
}
