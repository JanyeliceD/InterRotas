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

  async listar(codigo?: string, nome?: string, motorista?: string) {
    let resultado = await this.rotaModel.find();

    if (!resultado || !codigo || !nome || !motorista) {
      throw new NotFoundException('Nenhuma rota encontrada');
    }

    if (codigo) {
      resultado = resultado.filter((rota) => rota.codigo === codigo);
    }

    if (nome) {
      resultado = resultado.filter((rota) => rota.nome === nome);
    }

    if (motorista) {
      resultado = resultado.filter((rota) => rota.motorista === motorista);
    }

    return resultado;
  }

  async buscarPorId(id: string) {
    const rota = await this.rotaModel.findById(id);

    if (!rota) {
      throw new NotFoundException('Rota não encontrada');
    }

    return rota;
  }

  async criar(dados: CreateRotaDto): Promise<Rota> {
    const ultimaRota = await this.rotaModel
      .findOne()
      .sort({ codigo: -1 });
    
    let proximoCodigo = 1;

    if (ultimaRota?.codigo) {
      const numeroAtual = parseInt(
        ultimaRota.codigo.replace('ROTA', ''),
        10,
      );

      if (!isNaN(numeroAtual)) {
        proximoCodigo = numeroAtual + 1;
      }
    }

    const codigo = `ROTA${String(proximoCodigo).padStart(3, '0')}`;

    const novaRota = await this.rotaModel.create({
      ...dados,
      codigo,
    });

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