import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Rota, RotaDocument } from 'src/schemas/rota.schema';


@Injectable()
export class RotasService {

  constructor(
    @InjectModel(Rota.name) private rotaModel: Model<RotaDocument>
  ) {}

  async listar() {
    return this.rotaModel.find();
  }

  async buscarPorId(id: string) {
    const rota = await this.rotaModel.findById(id);

    if (!rota) {
      throw new NotFoundException('Rota não encontrada');
    }

    return rota;
  }

  async criar(dados: Omit<Rota, 'id'>) {
    const novaRota = new this.rotaModel(dados);
    return novaRota.save();
  }
}