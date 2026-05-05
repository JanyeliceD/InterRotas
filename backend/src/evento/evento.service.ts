import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Evento, EventoDocument } from './schemas/evento.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

//Evento que o backend vai receber do dispositivo

@Injectable()
export class EventoService {
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<EventoDocument>
  ) {}

  async listar(): Promise<Evento[]> {
    return this.eventoModel.find();
  }

  async buscarPorId(id: string): Promise<Evento> {
    const evento = await this.eventoModel.findById(id);

    if (!evento) {
      throw new NotFoundException('Evento não encontrado');
    }

    return evento;
  }

  async criar(dados: CreateEventoDto): Promise<Evento> {
    const evento = new this.eventoModel(dados);
    return evento.save();
  }

  async atualizar(id: string, data: UpdateEventoDto): Promise<Evento> {
    const evento = await this.eventoModel.findByIdAndUpdate(id, data, {
      new: true, // retorna o atualizado
    });

    if (!evento) {
      throw new NotFoundException('Evento não encontrado');
    }

    return evento;
  }

  async remover(id: string): Promise<Evento> {
    const evento = await this.eventoModel.findByIdAndDelete(id);

    if (!evento) {
      throw new NotFoundException('Evento não encontrado');
    }

    return evento;
  }
}