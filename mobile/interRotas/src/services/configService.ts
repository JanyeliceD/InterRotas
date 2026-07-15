import { Config } from 'react-native-gesture-handler/lib/typescript/web/interfaces';
import { api } from './api'

export async function salvarPrecoDieselBackend(preco: number) {
  const resposta = await api.post<Config[]>('config/diesel', { preco });
  return resposta.data;
} 
export async function buscarPrecoDieselBackend() {
  const resposta = await api.get<Config[]>('config/diesel');
  return resposta.data; 
}

export async function buscarRelatorioConsumoBackend() {
  const resposta = await api.get<Config[]>('config/consumo-rotas');
  return resposta.data; 
}