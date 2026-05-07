import{Injectable, NotFoundException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Parada, ParadaDocument } from '../schemas/parada.schemas';

//Parada que o backend vai receber do dispositivo

@Injectable()
export class ParadasService {
  constructor(
    @InjectModel(Parada.name) private paradaModel: Model<ParadaDocument>
  ) {}
  
  async listar() {
    return this.paradaModel.find();
  }

  async buscarPorId(id: string) {
    const parada = await this.paradaModel.findById(id);
    
    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }
    
    return parada;
  }

  async criar(dados: Omit<Parada, 'id'>) {
    const novaParada = new this.paradaModel(dados);
    return novaParada.save();
  }
}