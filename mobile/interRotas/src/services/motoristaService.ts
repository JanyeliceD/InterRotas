import { api } from './api';
import { Motorista, CreateMotoristaDto } from '../types/motorista';

export async function listarMotoristas(): Promise<Motorista[]> {
    const response = await api.get<Motorista[]>('/motorista');

    return response.data;
}

export async function cadastrarMotorista(dados: CreateMotoristaDto): Promise<Motorista> {
    const response = await api.post<Motorista>('/motorista', dados);

    return response.data;
}