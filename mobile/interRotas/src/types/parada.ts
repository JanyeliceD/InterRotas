export interface Parada {
    _id: string;
    codigo: string;
    nome: string;
    endereco: string;
    latitude: number;
    longitude: number;
}

export interface CreateParadaDto {
    nome: string;
    endereco: string;
    latitude: number;
    longitude: number;
}