import { Injectable, NotFoundException } from '@nestjs/common';

type Onibus = {
    id: number;
    placa: string;
    modelo: string;
    idRota: number;
}

@Injectable()
export class OnibusService {
    private readonly onibus = [
        { id: 1, placa: 'ABC-1234', modelo: 'Mercedes-Benz', idRota: 1 },
        { id: 2, placa: 'DEF-5678', modelo: 'Volvo', idRota: 2 },
        { id: 3, placa: 'GHI-9012', modelo: 'Scania', idRota: 3 },
    ];

    listar() {
        return this.onibus;
    }

    buscarPorId(id: number) {
        const onibus = this.onibus.find((onibus) => onibus.id === id);

        if (!onibus) {
            throw new NotFoundException('Ônibus não encontrado');
        }

        return onibus;
    }

    criar(dados: Omit<Onibus, 'id'>) {
        const novoId = this.onibus.length > 0 
            ? Math.max(...this.onibus.map((onibus) => onibus.id)) + 1 
            : 1;

        const novoOnibus: Onibus = { id: novoId, ...dados };
        this.onibus.push(novoOnibus);

        return novoOnibus;
    }
}
