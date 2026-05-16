import {
    Controller, 
    Get, 
    Param, 
    Post,
    Body,
    Patch,
    Delete 
} from '@nestjs/common';
import {RotasService} from './rotas.service';
import { CreateRotaDto } from './dto/create-rota.dto';
import { UpdateRotaDto } from './dto/update-rota.dtp';

@Controller('rotas')
export class RotasController {
    constructor (private readonly rotasService: RotasService ) {}

    @Get()
    listar() {
        return this.rotasService.listar();
    }

    @Get(':id')
    buscarPorId(@Param ('id') id: string) {
        return this.rotasService.buscarPorId(id); 
    }   

    @Post()
      criar(@Body() body: CreateRotaDto){
        return this.rotasService.criar(body);
      }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() body: UpdateRotaDto) {
        return this.rotasService.atualizar(id, body);
    }

    @Delete(':id')
    remover(@Param('id') id: string) {
        return this.rotasService.remover(id);
    }

}