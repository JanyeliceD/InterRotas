export interface Motorista {
    _id: string;
    matricula: string;
    nome: string;
    cpf: string;
    cnh: string;
    email: string;
    telefone: string;
}

export interface CreateMotoristaDto {
    nome: string;
    cpf: string;
    cnh: string;
    email: string;
    telefone: string;
}