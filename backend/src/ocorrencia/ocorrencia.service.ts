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

    async listar(
        codigo?: string, 
        tipo?: 'FALHA_MECANICA' | 'PNEU_FURADO' | 'ACIDENTE' | 'TRANSITO' | 'OUTRO', 
        status?: 'ABERTA' | 'EM_ANDAMENTO' | 'RESOLVIDA') {
    let resultado = await this.ocorrenciaModel
    .find()
    .populate('idOnibus', 'codigo placa');

    if (codigo) {
        resultado = resultado.filter(
            (ocorrencia) =>
                ocorrencia.codigo === codigo,
        );
    }

    if (tipo) {
        resultado = resultado.filter(
            (ocorrencia) =>
                ocorrencia.tipo === tipo,
        );
    }

    if (status) {
        resultado = resultado.filter(
            (ocorrencia) =>
                ocorrencia.status === status,
        );
    }

    return resultado;
    }

    async buscarPorId(id: string) {
        const ocorrencia = await this.ocorrenciaModel.findById(id);
    
        if (!ocorrencia) {
            throw new NotFoundException('Ocorrência não encontrada');
        }
    
        return ocorrencia;
    }

    async criar(dados: CreateOcorrenciaDto): Promise<Ocorrencia> {
        const ultimaOcorrencia = await this.ocorrenciaModel
            .findOne()
            .sort({ codigo: -1 });

        let proximoCodigo = 1;

        if (ultimaOcorrencia?.codigo) {
            const numeroAtual = parseInt(
                ultimaOcorrencia.codigo.replace('OCOR', ''),
                10
            );

            if (!isNaN(numeroAtual)) {
                proximoCodigo = numeroAtual + 1;
            }
        }

        const codigo = `OCOR${String(proximoCodigo).padStart(3, '0')}`;

        const novaOcorrencia = await this.ocorrenciaModel.create({
            ...dados,
            codigo,
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
