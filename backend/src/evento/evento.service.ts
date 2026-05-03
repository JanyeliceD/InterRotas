import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Evento, EventoDocument } from './schemas/evento.schema';
//Evento que o backend vai receber do dispositivo

@Injectable()
export class EventoService {
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<EventoDocument>
  ) {}

  async listar() {
    return this.eventoModel.find();
  }

  async buscarPorId(id: string) {
    const evento = await this.eventoModel.findById(id);

    if (!evento) {
      throw new NotFoundException('Evento não encontrado');
    }

    return evento;
  }

  async criar(dados: any) {
    const evento = new this.eventoModel(dados);
    return evento.save();
  }
}