import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Rota, RotaDocument } from 'src/schemas/rota.schema';
import { CreateRotaDto } from './dto/create-rota.dto';
import { UpdateRotaDto } from './dto/update-rota.dtp';


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

  async criar(dados: CreateRotaDto): Promise<Rota> {
    const novaRota = new this.rotaModel(dados);
    return novaRota.save();
  }

  async atualizar(id: string, dados: UpdateRotaDto): Promise<Rota> {
    const rota = await this.rotaModel.findByIdAndUpdate(id, dados, {
      new: true, // retorna o atualizado
    });

    if (!rota) {
      throw new NotFoundException('Rota não encontrada');
    }

    return rota;
  }

  async remover(id: string): Promise<Rota> {
    const rota = await this.rotaModel.findByIdAndDelete(id);

    if (!rota) {
      throw new NotFoundException('Rota não encontrada');
    }

    return rota;
  }
}