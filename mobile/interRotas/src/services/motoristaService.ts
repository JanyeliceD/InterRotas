import { api } from './api';

export interface Motorista {
    _id: string;
    matricula: string;
    nome: string;
}

export interface CreateMotoristaDto {
    nome: string;
    cpf: string;
    cnh: string;
    email: string;
    telefone: string;
}

export async function listarMotoristas(): Promise<Motorista[]> {
    const response = await api.get<Motorista[]>('/motorista');

    return response.data;
}

export async function cadastrarMotorista(dados: CreateMotoristaDto): Promise<Motorista> {
    const response = await api.post<Motorista>('/motorista', dados);

    return response.data;
}