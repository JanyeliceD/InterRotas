import { Controller, Get, Post, Body, ParseFloatPipe } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('diesel')
  async buscarDiesel() {
    return this.configService.obterPrecoDiesel();
  }

  @Post('diesel')
  async atualizarDiesel(@Body('preco', ParseFloatPipe) preco: number) {
    return this.configService.salvarPrecoDiesel(preco);
  }

  @Get('consumo-rotas')
async obterConsumoAbastecimento() {
  return this.configService.calcularConsumoPorRota();
}
}