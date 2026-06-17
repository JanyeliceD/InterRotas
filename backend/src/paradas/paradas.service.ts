import{Injectable, NotFoundException} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Parada, ParadaDocument } from '../schemas/parada.schemas';
import { CreateParadaDto } from './dto/create-parada.dto';
import { UpdateParadaDto } from './dto/update-parada.dto';

@Injectable()
export class ParadasService {
  constructor(
    @InjectModel(Parada.name) private paradaModel: Model<ParadaDocument>
  ) {}
  
  async listar(codigo?: string, nome?: string): Promise<Parada[]> {
    let resultado = await this.paradaModel.find();

    if (!resultado || !codigo || !nome) {
      throw new NotFoundException('Nenhuma parada encontrada');
    }

    if (codigo) {
      resultado = resultado.filter((parada) => parada.codigo === codigo);
    }

    if (nome) {
      resultado = resultado.filter((parada) => parada.nome === nome);
    }

    return resultado;
  }

  async buscarPorId(id: string) {
    const parada = await this.paradaModel.findById(id);
    
    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }
    
    return parada;
  }

  async criar(dados: CreateParadaDto): Promise<Parada> {
    const ultimaParada = await this.paradaModel
      .findOne({
        codigo: /^PAR\d+$/
      })
      .sort({ codigo: -1 });

    let proximoNumero = 1;

    if (ultimaParada?.codigo) {
      const numeroAtual = parseInt(
        ultimaParada.codigo.replace('PAR', ''),
        10,
      );  

      if (!isNaN(numeroAtual)) {
        proximoNumero = numeroAtual + 1;
      }
    }

    const codigo = `PAR${proximoNumero.toString().padStart(3, '0')}`;
    const novaParada = new this.paradaModel({ 
      ...dados, 
      codigo 
    });

    return novaParada.save();
  }

  async atualizar(id: string, dados: UpdateParadaDto): Promise<Parada> {
    const parada = await this.paradaModel.findByIdAndUpdate(id, dados, {
      new: true, // retorna o atualizado
    });

    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }

    return parada;
  }

  async remover(id: string): Promise<Parada> {
    const parada = await this.paradaModel.findByIdAndDelete(id);

    if (!parada) {
      throw new NotFoundException('Parada não encontrada');
    }

    return parada;
  }
}