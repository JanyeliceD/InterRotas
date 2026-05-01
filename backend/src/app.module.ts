import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';
import { OnibusModule } from './onibus/onibus.module';
import { ParadasModule } from './paradas/paradas.module';

@Module({
  imports: [EventoModule, OnibusModule, ParadasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
