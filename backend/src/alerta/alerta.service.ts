import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Alerta, AlertaDocument } from '../schemas/alerta.schema';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import {Rota,RotaDocument} from '../schemas/rota.schema';
//Alerta que o backend vai receber do dispositivo

@Injectable()
export class AlertaService {
  constructor(
    @InjectModel(Alerta.name) private AlertaModel: Model<AlertaDocument>,
    @InjectModel('Rota') private readonly rotaModel: Model<RotaDocument> 
) {}

  // 🧮 Função auxiliar da Fórmula de Haversine
  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Raio da Terra em metros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // 🚀 O método que o Controller vai chamar
async processarRastreio(idRota: string, latAtual: number, lonAtual: number) {
    // Busca a rota e traz os dados completos das paradas associadas
    const rota = await this.rotaModel.findById(idRota).populate('paradas').exec();
    if (!rota) throw new NotFoundException('Rota não encontrada');

    // 1. LÓGICA DE DESVIO
    const limiteDesvio = 150; // metros
    const distancias = rota.paradas.map((parada: any) => 
      this.calcularDistancia(latAtual, lonAtual, parada.latitude, parada.longitude)
    );
    const menorDistancia = Math.min(...distancias);
    const desviou = menorDistancia > limiteDesvio;

    // 2. LÓGICA DE ATRASO (Exemplo simplificado comparando com o horário local)
    let atrasado = false;
    // Se estiver a menos de 50 metros de alguma parada, checa o horário dela
    const paradaAtual = rota.paradas.find((parada: any) => 
      this.calcularDistancia(latAtual, lonAtual, parada.latitude, parada.longitude) < 50
    );

    if (paradaAtual) {
      // Aqui você faria a lógica de tempo comparando o horário de agora
      // com o horário previsto salvo na parada/rota.
      atrasado = true; // Exemplo simulado
    }

    return {
      desviou,
      atrasado,
      menorDistanciaParaUmaParada: Math.round(menorDistancia),
      timestamp: new Date()
    };
}
  async listar(): Promise<Alerta[]> {
    return this.AlertaModel.find()
    .populate('idOnibus', 'codigo placa');
  }

  async buscarPorId(id: string): Promise<Alerta> {
    const alerta = await this.AlertaModel.findById(id);

    if (!alerta) {
      throw new NotFoundException('Alerta não encontrado');
    }

    return alerta;
  }

  async criar(dados: CreateAlertaDto): Promise<Alerta> {
    const ultimoAlerta = await this.AlertaModel
    .findOne()
    .sort({ codigo: -1 });

    let proximoCodigo = 1;

    if (ultimoAlerta?.codigo) {
      const numeroAtual = parseInt(
        ultimoAlerta.codigo.replace('ALE', ''),
          10
      );

    if (!isNaN(numeroAtual)) {
        proximoCodigo = numeroAtual + 1;
      }
    }

    const codigo = `ALE${String(proximoCodigo).padStart(3, '0')}`;

    return this.AlertaModel.create({
        ...dados,
        codigo,
        status: 'NOVO',
    });

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