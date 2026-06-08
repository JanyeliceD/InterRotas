import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ocorrencia, OcorrenciaDocument } from '../schemas/ocorrencia.schema';
import { CreateOcorrenciaDto } from './dto/create-ocorrencia.dto';
import { UpdateOcorrenciaDto } from './dto/update-ocorrencia.dto';

@Injectable()
export class OcorrenciaService {
    constructor(
        @InjectModel(Ocorrencia.name) private ocorrenciaModel: Model<OcorrenciaDocument>,
    ) {}

    async listar() {
        return this.ocorrenciaModel.find();
    }

    async buscarPorId(id: string) {
        const ocorrencia = await this.ocorrenciaModel.findById(id);
    
        if (!ocorrencia) {
            throw new NotFoundException('Ocorrência não encontrada');
        }
    
        return ocorrencia;
    }

    async criar(dados: CreateOcorrenciaDto): Promise<Ocorrencia> {
        const novaOcorrencia = await this.ocorrenciaModel.create({
            ...dados,
            status: 'ABERTA', // Define o status inicial como ABERTA
        });

        return novaOcorrencia.save();
    }

    async atualizar(id: string, dados: UpdateOcorrenciaDto): Promise<Ocorrencia> {
        const ocorrencia = await this.ocorrenciaModel.findByIdAndUpdate(id, dados, {
            new: true, // retorna o atualizado
        });
        
        if (!ocorrencia) {
            throw new NotFoundException('Ocorrência não encontrada');
        }
        
        return ocorrencia;
    }

    async remover(id: string): Promise<Ocorrencia> {
        const ocorrencia = await this.ocorrenciaModel.findByIdAndDelete(id);
        
        if (!ocorrencia) {
            throw new NotFoundException('Ocorrência não encontrada');
        }
        
        return ocorrencia;
    }
}
