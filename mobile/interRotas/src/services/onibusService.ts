import { api } from './api';
import { Onibus, CreateOnibusDto } from '../types/onibus';

export async function listarOnibus(): Promise<Onibus[]> {
    const response = await api.get<Onibus[]>('/onibus');

    return response.data;
}

export async function cadastrarOnibus(dados: CreateOnibusDto): Promise<Onibus> {
    const response = await api.post<Onibus>('/onibus', dados);

    return response.data;
}