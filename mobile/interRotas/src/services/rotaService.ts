import { api } from './api'

interface CreateRotaDto {
    nome: string;
    idMotorista: string;
    idOnibus: string;
    paradas: string[];
}

export async function  cadastrarRota(dados:CreateRotaDto) {
    const response = await api.post('/rotas', dados);

    return response.data;
}