import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { Config, ConfigSchema } from '../schemas/config.schema';
import { Rota, RotaSchema } from '../schemas/rota.schema'; // 👈 Importe o schema da rota

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Config.name, schema: ConfigSchema },
      { name: Rota.name, schema: RotaSchema } // 👈 Disponibiliza o model de rotas aqui dentro
    ])
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}