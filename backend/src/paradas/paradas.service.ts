import{Injectable, NotFoundException} from '@nestjs/common';

//Parada que o backend vai receber do dispositivo

export type  Parada = {
  id: number;
  nome: string;
  local: Local;
};
type Local = {
    rua: string;
    bairro: string;
    cidade: string;

}

@Injectable()
export class ParadasService {
  private paradas: Parada[] = [
    { id: 1, nome: 'Terminal Rodoviário de Currais Novos', local: {
      rua: 'Av. Teotônio Freire',
      bairro: 'Manoel Salustino',
      cidade: 'Currais Novos',
    },},
    { id: 2, nome: 'Rodoviária de Campo Redondo', local: {
        rua: 'Av. Sen. Joao Camara',
        bairro: 'Centro',
        cidade: 'Campo Redondo',
    },},
    { id: 3, nome: 'Terminal Rodoviário de Santa Cruz', local: {
        rua: 'Rua Cel. Júlio Pinheiro',
        bairro: 'Centro',
        cidade: 'Santa Cruz',
    },},
    { id: 4, nome: 'Terminal Rodoviário de Tangara', local: {
        rua: 'Av. Miguel Barbosa',
        bairro: 'Centro',
        cidade: 'Tangara',
    },},
    {id: 5, nome: 'Terminal Rodoviário de Serra Caiada', local: {
        rua: 'Nossa Sra. da conceição',
        bairro: 'Centro',
        cidade: 'Serra Caiada',
    },},
    {
      id:6, nome: 'Parada de Bom Jesus', local: {
        rua: 'Almir Freire',
        bairro: 'Centro',
        cidade: 'Bom Jesus',
      },
    },
    {
      id:7, nome: 'Terminal Rodoviário Vereador Cícero Martins', local: {
        rua: 'José Gomes',
        bairro: 'Auta de Souza',
        cidade: 'Macaíba',
      },
    },
    {
      id:8, nome: 'Terminal Rodoviário Severino Tomaz da Silveira', local: {
        rua: 'Av. Capitão Mor Gouveia',
        bairro: 'Cidade da Esperança',
        cidade: 'Natal',
      },
    },

  ];
  getAll() {
  return this.paradas;
}
   
  listar() {
    return this.paradas;
  }
  buscarPorId(id: number) {
    const parada = this.paradas.find(p => p.id === id);
    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }
    return parada;
  }
  criar(dados: Omit<Parada, 'id'>) {
    const novoId = this.paradas.length > 0 
    ? Math.max(...this.paradas.map(p => p.id)) + 1 
    : 1;

    const novaParada: Parada = { id: novoId, ...dados };
    this.paradas.push(novaParada);

    return novaParada;
  }
}