import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';
import { OnibusModule } from './onibus/onibus.module';
import { ParadasModule } from './paradas/paradas.module';
import { RotasModule } from './rotas/rotas.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
    RotasModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
