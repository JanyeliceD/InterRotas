import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Onibus, OnibusDocument } from '../schemas/onibus.schema';
import { CreateOnibusDto } from './dto/create-onibus.dto';
import { UpdateOnibusDto } from './dto/update-onibus.dto';

@Injectable()
export class OnibusService {
    constructor(
        @InjectModel(Onibus.name) private onibusModel: Model<OnibusDocument>
    ) {}

    async listar() {
        return this.onibusModel.find();
    }

    async buscarPorId(id: string) {
        const onibus = await this.onibusModel.findById(id);

        if (!onibus) {
            throw new NotFoundException('Ônibus não encontrado');
        }

        return onibus;
    }

    async criar(dados: CreateOnibusDto): Promise<Onibus> {
        const novoOnibus = new this.onibusModel(dados);
        return novoOnibus.save();
    }

    async atualizar(id: string, data: UpdateOnibusDto): Promise<Onibus> {
        const onibus = await this.onibusModel.findByIdAndUpdate(id, data, {
          new: true, // retorna o atualizado
        });
    
        if (!onibus) {
          throw new NotFoundException('Ônibus não encontrado');
        }
    
        return onibus;
      }

    async remover(id: string): Promise<Onibus> {
        const onibus = await this.onibusModel.findByIdAndDelete(id);
    
        if (!onibus) {
          throw new NotFoundException('Ônibus não encontrado');
        }
    
        return onibus;
      }
}
