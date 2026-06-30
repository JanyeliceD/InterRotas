import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Config, ConfigDocument } from '../schemas/config.schema';
// Importe o seu Schema de Rotas (ajuste o caminho se necessário)
import { Rota, RotaDocument } from '../schemas/rota.schema'; 

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel(Config.name) private configModel: Model<ConfigDocument>,
    @InjectModel(Rota.name) private rotaModel: Model<RotaDocument>, // 👈 Injeta o modelo de rotas
  ) {}

  async obterPrecoDiesel() {
    let config = await this.configModel.findOne().exec();
    if (!config) {
      config = await this.configModel.create({ precoDiesel: 5.90 });
    }
    return config;
  }

  async salvarPrecoDiesel(preco: number) {
    return this.configModel.findOneAndUpdate({}, { precoDiesel: preco }, { upsert: true, new: true }).exec();
  }

  // 📊 A MÁGICA DO CÁLCULO AQUI:
  async calcularConsumoPorRota() {
    const config = await this.obterPrecoDiesel();
    const precoDiesel = config.precoDiesel;
    const mediaKmL = 3.5; // Média padrão de um ônibus urbano

    const rotas = await this.rotaModel.find().exec();

    return rotas.map(rota => {
      // Força valores numéricos seguros caso o campo esteja nulo no banco
      const kmDaRota = rota.quilometragem || 0;
      const viagens = (rota as any).numeroViagens || 30; // Padrão 30 viagens (1 por dia) se não houver o campo
      
      const kmTotalNoMes = kmDaRota * viagens;
      const litrosConsumidos = kmTotalNoMes / mediaKmL;
      const custoFinanceiro = litrosConsumidos * precoDiesel;

      return {
        id: rota._id,
        nome: rota.nome || 'Rota sem nome',
        viagensNoMes: viagens,
        kmPorViagem: kmDaRota,
        kmTotal: parseFloat(kmTotalNoMes.toFixed(1)),
        litrosConsumidos: parseFloat(litrosConsumidos.toFixed(1)),
        custoTotal: parseFloat(custoFinanceiro.toFixed(2)),
      };
    });
  }
}