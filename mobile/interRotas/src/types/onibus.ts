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