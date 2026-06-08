import { Module } from '@nestjs/common';
import { OcorrenciaController } from './ocorrencia.controller';
import { OcorrenciaService } from './ocorrencia.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ocorrencia, OcorrenciaSchema } from '../schemas/ocorrencia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ocorrencia.name, schema: OcorrenciaSchema }
    ])
  ],
  controllers: [OcorrenciaController],
  providers: [OcorrenciaService],
})
export class OcorrenciaModule {}
