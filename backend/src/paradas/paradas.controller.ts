import {Controller, Get,Param,BadRequestException,Post,Body } from '@nestjs/common';
import { ParadasService } from './paradas.service';

@Controller('paradas')
export class ParadasController {
    constructor (private readonly paradaService: ParadasService ) {}

    @Get() 
    listar() {
        return this.paradaService.listar();
        }
    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        const idNumero= Number(id);
        if(Number.isNaN(idNumero)){
            throw new BadRequestException('ID deve ser um número');
        }
        return  this.paradaService.buscarPorId(idNumero);
    }
    @Post()
    criar(
        @Body()
        body: {
            nome:string,
            categoria: string,
            local: {
                rua: string,
                bairro: string,
                cidade: string,
            }
        },
    ) {
        return this.paradaService.criar(body);
        }

}