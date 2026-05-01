import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';
import { ParadasModule } from './paradas/paradas.module';
import { RotasModule } from './rotas/rotas.module';

@Module({
  imports: [EventoModule, ParadasModule, RotasModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
