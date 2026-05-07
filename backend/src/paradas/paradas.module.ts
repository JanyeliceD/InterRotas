import {Module} from '@nestjs/common';
import {ParadasController} from './paradas.controller';
import {ParadasService} from './paradas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Parada, ParadaSchema } from '../schemas/parada.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parada.name, schema: ParadaSchema }
    ])
  ],
  controllers: [ParadasController],
  providers: [ParadasService]
})
export class ParadasModule {}