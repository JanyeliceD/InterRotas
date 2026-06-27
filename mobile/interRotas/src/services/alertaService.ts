import { api } from './api'

export type Onibus = {
    _id: string;
    codigo: string;
    placa: string;
}

export interface Alerta {
    _id: string; 
    codigo: string;
    idOnibus: Onibus;
    tipo: 'DESVIO_ROTA' | 'ATRASO' | 'LOTACAO' | 'OUTRO';
    descricao?: string;
    status: 'NOVO' | 'CIENTE' | 'ATENDIDO';
    dataCriacao: Date;
}

export async function listarAlertas(): Promise<Alerta[]> {
    const response = await api.get<Alerta[]>('/alerta');

    return response.data;
}

export async function atualizarStatus(
    id: string,
    status: 'CIENTE' | 'ATENDIDO'
) {
    const response = await api.patch(`/alerta/${id}`, {
        status,
    });

    return response.data;
}