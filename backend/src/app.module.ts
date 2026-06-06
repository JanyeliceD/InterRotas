import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';
import { OnibusModule } from './onibus/onibus.module';
import { ParadasModule } from './paradas/paradas.module';
import { RotasModule } from './rotas/rotas.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalizacaoModule } from './localizacao/localizacao.module';
import { MotoristaModule } from './motorista/motorista.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    EventoModule, 
    OnibusModule, 
    ParadasModule, 
    RotasModule, 
    LocalizacaoModule, 
    MotoristaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
