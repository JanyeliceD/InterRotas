import { Injectable, NotFoundException } from '@nestjs/common';
import { ParadasService } from 'src/paradas/paradas.service';
import { Parada } from 'src/paradas/paradas.service';

export type Rota = {
  id: number;
  nome: string;
  paradas: Parada[];
  idOnibus: number;
  motorista: string;
  origem: Parada;
  destino: Parada;
  horarioEmbarque?: string;
};


@Injectable()
export class RotasService {
  private rotas: Rota[];
  

  constructor(private paradasService: ParadasService) {
    const paradas = this.paradasService.getAll();
    

    this.rotas = [
      {
        id: 1,
        nome: 'Rota 1',

        paradas: paradas, 

        idOnibus: 1,
        motorista: 'João Silva',

        origem: paradas[0],
        destino: paradas[paradas.length - 1],

        horarioEmbarque: '08:00',
      },
    ];
  }

  listar() {
    return this.rotas;
  }

  buscarPorId(id: number) {
    const rota = this.rotas.find(r => r.id === id);
    if (!rota) {
      throw new NotFoundException('Rota não encontrada');
    }
    return rota;
  }

  criar(dados: Omit<Rota, 'id'>) {
    const novoId = this.rotas.length > 0 
      ? Math.max(...this.rotas.map(r => r.id)) + 1 
      : 1;

    const novaRota: Rota = { id: novoId, ...dados };
    this.rotas.push(novaRota);

    return novaRota;
  }
}