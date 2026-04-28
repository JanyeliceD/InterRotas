import { Injectable, NotFoundException } from '@nestjs/common';

//Evento que o backend vai receber do dispositivo

type Evento = {
  id: number;
  idOnibus: number;
  idParada: number;
  timestamp: string;
};

@Injectable()
export class EventoService {
  private eventos: Evento[] = [
    { id: 1, idOnibus: 123, idParada: 456, timestamp: '2023-06-01T12:00:00Z' },
    { id: 2, idOnibus: 789, idParada: 132, timestamp: '2023-06-01T12:05:00Z' },
  ];

  listar() {
    return this.eventos;
  }

  buscarPorId(id: number) {
    const evento = this.eventos.find(e => e.id === id);

    if (!evento) {
      throw new NotFoundException('Evento não encontrado');
    }

    return evento;
  }

  criar(dados: Omit<Evento, 'id'>) {
    const novoId = this.eventos.length > 0 
    ? Math.max(...this.eventos.map(e => e.id)) + 1 
    : 1;

    const novoEvento: Evento = { id: novoId, ...dados };
    this.eventos.push(novoEvento);

    return novoEvento;
  }
}