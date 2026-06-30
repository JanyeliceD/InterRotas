import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertaModule } from './alerta/alerta.module';
import { OnibusModule } from './onibus/onibus.module';
import { ParadasModule } from './paradas/paradas.module';
import { RotasModule } from './rotas/rotas.module';

// 1. IMPORTAÇÃO DO NESTJS CONFIG AJUSTADA:
// Importamos o módulo (com apelido) E o ConfigService (que o Mongoose usa para ler o .env)
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config'; 

import { MongooseModule } from '@nestjs/mongoose';
import { LocalizacaoModule } from './localizacao/localizacao.module';
import { MotoristaModule } from './motorista/motorista.module';
import { OcorrenciaModule } from './ocorrencia/ocorrencia.module';
import { ConfigModule as MinhaConfigModule } from './config/config.module';

@Module({
  imports: [
    // Inicializa o gerenciador de variáveis de ambiente do Nest
    NestConfigModule.forRoot({ isGlobal: true }),

    // 2. MONGOOSE CONFIGURADO CORRETAMENTE:
    MongooseModule.forRootAsync({
      imports: [NestConfigModule], // Dizemos ao Mongoose de onde vem o serviço
      inject: [ConfigService],     // Injetamos o SERVIÇO nativo do NestJS (não o módulo)
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'), // Agora o .get funciona perfeitamente!
      }),
    }),

    AlertaModule, 
    OnibusModule, 
    ParadasModule, 
    RotasModule, 
    LocalizacaoModule, 
    MotoristaModule, 
    OcorrenciaModule,
    MinhaConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}