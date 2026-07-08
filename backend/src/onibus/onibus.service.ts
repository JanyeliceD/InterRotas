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

    async listar(placa?: string, modelo?: string) {
    let resultado = await this.onibusModel.find();

    if (placa) {
        resultado = resultado.filter(
            (onibus) =>
                onibus.placa === placa
        );
    }

    if (modelo) {
        resultado = resultado.filter(
            (onibus) =>
                onibus.modelo === modelo
        );
    }

    return resultado;
}

    async buscarPorId(id: string) {
      const onibus = await this.onibusModel.findById(id);

      if (!onibus) {
        throw new NotFoundException('Ônibus não encontrado');
      }

      return onibus;
    }

    async criar(dados: CreateOnibusDto): Promise<Onibus> {
      const ultimoOnibus = await this.onibusModel
      .findOne({
        codigo: /^BUS\d+$/
      })
      .sort({ codigo: -1 });

      console.log('ultimo onibus', ultimoOnibus);

      let proximoNumero = 1;

      if (ultimoOnibus?.codigo) {
        const numeroAtual = parseInt(
          ultimoOnibus.codigo.replace('BUS', ''),
          10,
        );

        if (!isNaN(numeroAtual)) {
          proximoNumero = numeroAtual + 1;
        }
      }

      const codigo = `BUS${String(proximoNumero).padStart(3, '0')}`;

      const novoOnibus = new this.onibusModel({ 
        ...dados,
        codigo
      });

      return novoOnibus.save();
    }

    async atualizar(id: string, data: UpdateOnibusDto): Promise<Onibus> {
      const onibus = await this.onibusModel.findByIdAndUpdate(id, data, {
        new: true, 
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
