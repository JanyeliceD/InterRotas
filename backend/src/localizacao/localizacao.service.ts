import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Parada, ParadaDocument } from 'src/schemas/parada.schemas';
import { Evento, EventoDocument } from 'src/schemas/evento.schema';
import { Localizacao, LocalizacaoDocument } from 'src/schemas/localizacao.schemas';
import { CreateLocalizacaoDto } from './dto/create-localizacao.dto';

@Injectable()
export class LocalizacaoService {
    constructor(
        @InjectModel(Parada.name) private paradaModel: Model<ParadaDocument>,
        @InjectModel(Evento.name) private eventoModel: Model<EventoDocument>,
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
        const { onibusId, latitude, longitude } = dados;

        await this.localizacaoModel.create({
            onibusId: new mongoose.Types.ObjectId(onibusId),
            latitude,
            longitude,
        });

        const paradas = await this.paradaModel.find();

        const RAIO = 50; // metros

        for (const parada of paradas) {
            const distancia = this.calcularDistancia(
                latitude, 
                longitude, 
                parada.latitude, 
                parada.longitude
            );

        if (distancia <= RAIO) {
            const ultimoEvento = await this.eventoModel
            .findOne({ onibusId })
            .sort({ timestamp: -1 });

            if (
                ultimoEvento &&
                ultimoEvento.paradaId.toString() === parada._id.toString()
            ) {
                return { message: 'Evento já registrado para esta parada' }
            }

            const evento = new this.eventoModel({
                onibusId: new mongoose.Types.ObjectId(onibusId),
                paradaId: parada._id,
                timestamp: new Date(),
            });

            await evento.save();

            return {
                message: 'Parada detectada',
                paradaId: parada._id,
            };
        }
    }

    return { message: 'Nenhuma parada detectada' };
    }

    async buscarUltimaLocalizacao(onibusId: string) {
        return this.localizacaoModel
            .findOne({ 
                onibusId: new mongoose.Types.ObjectId(onibusId)
            })
            .sort({ timestamp: -1 });
    }
}
