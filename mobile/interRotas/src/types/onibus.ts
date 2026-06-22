export interface Onibus {
    _id: string;
    codigo: string;
    placa: string;
    modelo: string;
    capacidade: number;
    // idRota: string; // ID da rota associada
}

export interface CreateOnibusDto {
    placa: string;
    modelo: string;
    capacidade: number;
}