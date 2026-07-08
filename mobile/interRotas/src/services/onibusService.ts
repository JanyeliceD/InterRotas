import { api } from './api';

export interface Onibus {
    _id: string;
    codigo: string;
    placa: string;
}

export interface CreateOnibusDto {
    placa: string;
    modelo: string;
    capacidade: number;
}

export async function listarOnibus(): Promise<Onibus[]> {
    const response = await api.get<Onibus[]>('/onibus');

    return response.data;
}

export async function cadastrarOnibus(dados: CreateOnibusDto): Promise<Onibus> {
    const response = await api.post<Onibus>('/onibus', dados);

    return response.data;
}

export async function buscarOnibusPorPlaca(
  placa: string
): Promise<Onibus | null> {
  const response = await api.get<Onibus[]>('/onibus', {
    params: {
      placa,
    },
  });

  if (response.data.length === 0) {
    return null;
  }

  return response.data[0];
}