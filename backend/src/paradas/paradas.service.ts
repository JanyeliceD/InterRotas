import{Injectable, NotFoundException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Parada, ParadaDocument } from '../schemas/parada.schemas';
import { CreateParadaDto } from './dto/create-parada.dto';
import { UpdateParadaDto } from './dto/update-parada.dto';

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

  async criar(dados: CreateParadaDto): Promise<Parada> {
    const novaParada = new this.paradaModel(dados);
    return novaParada.save();
  }

  async atualizar(id: string, dados: UpdateParadaDto): Promise<Parada> {
    const parada = await this.paradaModel.findByIdAndUpdate(id, dados, {
      new: true, // retorna o atualizado
    });

    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }

    return parada;
  }

  async remover(id: string): Promise<Parada> {
    const parada = await this.paradaModel.findByIdAndDelete(id);

    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }

    return parada;
  }
}