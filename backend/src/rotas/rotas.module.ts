import {Module} from '@nestjs/common';
import {RotasService} from './rotas.service';
import {RotasController} from './rotas.controller';
import {ParadasService} from 'src/paradas/paradas.service';


@Module({ 
    controllers: [RotasController],
    providers: [RotasService , ParadasService]
})
export class RotasModule {}

