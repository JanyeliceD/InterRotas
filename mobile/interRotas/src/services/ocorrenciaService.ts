import { api } from './api'

export type Onibus = {
    _id: string;
    codigo: string;
    placa: string;
}

export type TipoOcorrencia = 
    | 'FALHA_MECANICA' 
    | 'PNEU_FURADO' 
    | 'ACIDENTE' 
    | 'TRANSITO' 
    | 'OUTRO';

export interface Ocorrencia {
    _id: string;
    codigo: string;
    idOnibus: Onibus;
    tipo: TipoOcorrencia;
    descricao?: string;
    status: 'ABERTA' | 'EM_ANDAMENTO' | 'RESOLVIDA';
    dataCriacao: Date;
    observacaoAdmin?: string;
}

export async function registrarOcorrencia(
    idOnibus: string,
    tipo: 'FALHA_MECANICA' | 'PNEU_FURADO' | 'ACIDENTE' | 'TRANSITO' | 'OUTRO',
    descricao?: string
): Promise<Ocorrencia> {
    const response = await api.post<Ocorrencia>('/ocorrencia', {
        idOnibus,
        tipo,
        descricao,
    });

    return response.data;
}

export async function listarOcorrencias(): Promise<Ocorrencia[]> {
    const response = await api.get<Ocorrencia[]>('/ocorrencia');

    return response.data;
}

export async function atualizarStatus(
    id: string,
    status: 'EM_ANDAMENTO' | 'RESOLVIDA'
) {
    const response = await api.patch(`/ocorrencia/${id}`, {
        status,
    });

    return response.data;
}