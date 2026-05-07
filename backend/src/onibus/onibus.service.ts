import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Onibus, OnibusDocument } from '../schemas/onibus.schema';

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

    async criar(dados: Omit<Onibus, 'id'>) {
        const novoOnibus = new this.onibusModel(dados);
        return novoOnibus.save();
    }

}
