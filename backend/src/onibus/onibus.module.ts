import { Module } from '@nestjs/common';
import { OnibusService } from './onibus.service';
import { OnibusController } from './onibus.controller';

@Module({
  providers: [OnibusService],
  controllers: [OnibusController]
})
export class OnibusModule {}
