import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Parada, ParadaDocument } from 'src/schemas/parada.schemas';
import { Alerta, AlertaDocument } from 'src/schemas/alerta.schema';
import { Localizacao, LocalizacaoDocument } from 'src/schemas/localizacao.schemas';
import { CreateLocalizacaoDto } from './dto/create-localizacao.dto';

@Injectable()
export class LocalizacaoService {
    constructor(
        @InjectModel(Parada.name) private paradaModel: Model<ParadaDocument>,
        @InjectModel(Alerta.name) private alertaModel: Model<AlertaDocument>,
        @InjectModel(Localizacao.name) private localizacaoModel: Model<Localizacao>,
    ) {}

    calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    async processarLocalizacao(dados: CreateLocalizacaoDto) {
        const { idOnibus, latitude, longitude } = dados;

        const localizacao = await this.localizacaoModel.create({
            idOnibus: new mongoose.Types.ObjectId(idOnibus),
            latitude,
            longitude,
        });

        return localizacao;
    }

    async buscarUltimaLocalizacao(idOnibus: string) {
        return this.localizacaoModel
            .findOne({ 
                idOnibus: new mongoose.Types.ObjectId(idOnibus)
            })
            .sort({ timestamp: -1 });
    }
}
