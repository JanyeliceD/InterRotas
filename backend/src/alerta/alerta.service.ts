import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Alerta, AlertaDocument } from '../schemas/alerta.schema';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';

//Alerta que o backend vai receber do dispositivo

@Injectable()
export class AlertaService {
  constructor(
    @InjectModel(Alerta.name) private AlertaModel: Model<AlertaDocument>
  ) {}

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