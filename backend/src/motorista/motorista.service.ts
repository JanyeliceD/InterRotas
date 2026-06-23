import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Motorista, MotoristaDocument } from '../schemas/motorista.schema';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Injectable()
export class MotoristaService {
    constructor(
        @InjectModel(Motorista.name) private motoristaModel: Model<MotoristaDocument>,
    ) {}

async listar(matricula?: string, nome?: string) {
    let resultado = await this.motoristaModel.find();

    if (matricula) {
        resultado = resultado.filter(
            (motorista) =>
                motorista.matricula === matricula,
        );
    }

    if (nome) {
        resultado = resultado.filter(
            (motorista) =>
                motorista.nome === nome,
        );
    }

    return resultado;
}
    
    async buscarPorId(id: string) {
        const motorista = await this.motoristaModel.findById(id);
    
        if (!motorista) {
            throw new NotFoundException('Motorista não encontrado');
        }
    
        return motorista;
    }
    
    async criar(dados: CreateMotoristaDto): Promise<Motorista> {
        const ultimoMotorista = await this.motoristaModel
            .findOne()
            .sort({ matricula: -1 });
                
        let proximaMatricula = 1;

        if (ultimoMotorista?.matricula) {
            const numeroAtual = parseInt(
                ultimoMotorista.matricula.replace('MOT', ''),
                10,
            );

            if (!isNaN(numeroAtual)) {
                proximaMatricula = numeroAtual + 1;
            }
        }

        const matricula = `MOT${String(proximaMatricula).padStart(3, '0')}`;

        const motoristaCriado = new this.motoristaModel({
            ...dados,
            matricula,
        });

        return motoristaCriado.save();
    }
    
    async atualizar(id: string, dados: UpdateMotoristaDto): Promise<Motorista> {
        const motorista = await this.motoristaModel.findByIdAndUpdate(id, dados, {
            new: true, // retorna o atualizado
    });
        
        if (!motorista) {
            throw new NotFoundException('Motorista não encontrado');
        }
        
        return motorista;
    }
    
    async remover(id: string): Promise<Motorista> {
        const motorista = await this.motoristaModel.findByIdAndDelete(id);
        
        if (!motorista) {
            throw new NotFoundException('Motorista não encontrado');
        }
        
        return motorista;
    }
}
