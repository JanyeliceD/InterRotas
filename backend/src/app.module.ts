import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';

@Module({
  imports: [EventoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
