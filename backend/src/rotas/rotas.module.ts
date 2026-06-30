import {Module} from '@nestjs/common';
import {RotasService} from './rotas.service';
import {RotasController} from './rotas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rota, RotaSchema } from 'src/schemas/rota.schema';
import { ConfigModule } from '../config/config.module';

@Module({ 
    imports: [
        MongooseModule.forFeature([
            { name: Rota.name, schema: RotaSchema }
        ]),
        ConfigModule,

    ],
    controllers: [RotasController],
    providers: [RotasService]
})
export class RotasModule {}

