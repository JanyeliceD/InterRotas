import { api } from './api'

export interface CreateRotaDto {
    nome: string;
    idMotorista: string;
    idOnibus: string;
    paradas: string[];
}

export interface Rotas {
    _id: string;
    nome: string;
    idMotorista: string;
    idOnibus: string;
    paradas: string[];
}
export async function  cadastrarRota(dados:CreateRotaDto) {
    const response = await api.post('/rotas', dados);

    return response.data;
}
export async function listarRotas(): Promise<Rotas[]> {
    const response = await api.get<Rotas[]>('/rotas');

    return response.data;
}

export async function atualizarRota(id: string, dados: any): Promise<Rotas[]> {
    const response = await api.patch(`/rotas/${id}`, dados);
    return response.data;
}

export async function deletarRota(id: string): Promise<Rotas[]> {
    const response = await api.delete(`/rotas/${id}`);
    return response.data;
}
