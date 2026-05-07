import {BadRequestException, Controller, Get, Param, Post,Body} from '@nestjs/common';
import {RotasService} from './rotas.service';
import { CreateRotaDto } from './dto/create-rota.dto';

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
      criar(@Body() body: CreateRotaDto) {
        return this.rotasService.criar(body);
      }

}