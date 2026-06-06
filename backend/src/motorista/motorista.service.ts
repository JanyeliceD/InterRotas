import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


import { Motorista, MotoristaDocument } from '../schemas/motorista.schema';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { Onibus } from 'src/schemas/onibus.schema';

@Injectable()
export class MotoristaService {
    constructor(
        @InjectModel(Motorista.name) private motoristaModel: Model<MotoristaDocument>,
    ) {}

    async listar() {
        return this.motoristaModel.find();
    }
    
    async buscarPorId(id: string) {
        const motorista = await this.motoristaModel.findById(id);
    
        if (!motorista) {
            throw new NotFoundException('Motorista não encontrado');
        }
    
        return motorista;
    }
    
    async criar(dados: CreateMotoristaDto): Promise<Motorista> {
        const novoMotorista = new this.motoristaModel(dados);
        return novoMotorista.save();
    }
    
    async atualizar(id: string, data: UpdateMotoristaDto): Promise<Motorista> {
        const motorista = await this.motoristaModel.findByIdAndUpdate(id, data, {
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
