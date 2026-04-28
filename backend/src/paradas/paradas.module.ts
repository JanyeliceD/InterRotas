import {Module} from '@nestjs/common';
import {ParadasController} from './paradas.controller';
import {ParadasService} from './paradas.service';

@Module({
  controllers: [ParadasController],
  providers: [ParadasService]
})
export class ParadasModule {}