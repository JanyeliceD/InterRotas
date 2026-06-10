import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Alerta, AlertaDocument } from '../schemas/alerta.schema';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';

//Alerta que o backend vai receber do dispositivo

@Injectable()
export class AlertaService {
  constructor(
    @InjectModel(Alerta.name) private AlertaModel: Model<AlertaDocument>
  ) {}

  async listar(): Promise<Alerta[]> {
    return this.AlertaModel.find();
  }

  async buscarPorId(id: string): Promise<Alerta> {
    const alerta = await this.AlertaModel.findById(id);

    if (!alerta) {
      throw new NotFoundException('Alerta não encontrado');
    }

    return alerta;
  }

  async criar(dados: CreateAlertaDto): Promise<Alerta> {
    const alerta = new this.AlertaModel(dados);
    return alerta.save();
  }

  async atualizar(id: string, data: UpdateAlertaDto): Promise<Alerta> {
    const alerta = await this.AlertaModel.findByIdAndUpdate(id, data, {
      new: true, // retorna o atualizado
    });

    if (!alerta) {
      throw new NotFoundException('Alerta não encontrado');
    }

    return alerta;
  }

  async remover(id: string): Promise<Alerta> {
    const alerta = await this.AlertaModel.findByIdAndDelete(id);

    if (!alerta) {
      throw new NotFoundException('Alerta não encontrado');
    }

    return alerta;
  }
}