import { api } from './api';
import { Parada, CreateParadaDto } from '../types/parada';

export interface Paradas {
    _id: string;
    nome: string;
    latitude: number;
    longitude: number;
}

export async function listarParadas(): Promise<Parada[]> {
    const response = await api.get<Parada[]>('/paradas');

    return response.data;
}

export async function cadastrarParada(dados: CreateParadaDto): Promise<Parada> {
    const response = await api.post<Parada>('/paradas', dados);

    return response.data;
}