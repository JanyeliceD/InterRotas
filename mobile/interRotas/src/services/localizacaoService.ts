import { api } from './api';

export type Onibus = {
    _id: string;
    codigo: string;
    placa: string;
}

export interface Localizacao {
    idOnibus: Onibus;
    latitude: number;
    longitude: number;
}

export async function listarLocalizacoes() {
    const response = await api.get<Localizacao[]>('/localizacao');

    return response.data;
}