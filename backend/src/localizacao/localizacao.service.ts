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

    async listarHIstorico() {
    return this.localizacaoModel
        .find()
        .populate('idOnibus');
    }

    //ordena do mais novo para mais antigo e pega a primeira localizacao
    async listarUltimasLocalizacoes() {

        const localizacoes = await this.localizacaoModel
            .find()
            .sort({ timestamp: -1 })
            .populate('idOnibus');

        const mapa = new Map();

        for (const loc of localizacoes) {

            if (!loc.idOnibus) continue;

            const id = loc.idOnibus._id.toString();

            if (!mapa.has(id)) {
                mapa.set(id, loc);
            }
        }

        return [...mapa.values()];
    }

    async listarHistoricoOnibus(idOnibus: string) {

    return this.localizacaoModel
        .find({
            idOnibus: new mongoose.Types.ObjectId(idOnibus)
        })
        .sort({ timestamp: 1 })
        .populate('idOnibus');
    }

    async listarPorOnibus(idOnibus: string) {
    return this.localizacaoModel
        .find({
            idOnibus: new mongoose.Types.ObjectId(idOnibus),
        })
        .sort({ timestamp: 1 })
        .populate('idOnibus');
    }

    async remover(id: string) {
        const localizacao = await this.localizacaoModel.findByIdAndDelete(id);

        if (!localizacao) {
            throw new NotFoundException('Localização não encontrada');
        }

        return localizacao;
    }
}
