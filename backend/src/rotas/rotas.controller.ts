import {BadRequestException, Controller, Get, Param, Post,Body} from '@nestjs/common';
import {RotasService} from './rotas.service';
import { Parada } from 'src/paradas/paradas.service';

@Controller('rotas')
export class RotasController {
    constructor (private readonly rotasService: RotasService ) {}

    @Get()
    listar() {
        return this.rotasService.listar();
    }
    @Get(':id')
    buscarPorId(@Param ('id') id: string) {
        const idNumero= Number(id);
        if(Number.isNaN(idNumero)){
            throw new BadRequestException('ID deve ser um número');
        }
        return  this.rotasService.buscarPorId(idNumero);  
    }   

    @Post()
    criar(
        @Body()
        body:{
            nome: string;
            paradas: Parada[];
            idOnibus: number;
            motorista: string ;
            origem: Parada;
            destino: Parada;
            horarioEmbarque?: string;
        }
     ) {
        return this.rotasService.criar(body);       
        }
}