import { Module } from '@nestjs/common';
import { OnibusService } from './onibus.service';
import { OnibusController } from './onibus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Onibus, OnibusSchema } from '../schemas/onibus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Onibus.name, schema: OnibusSchema }
    ])
  ],
  providers: [OnibusService],
  controllers: [OnibusController]
})
export class OnibusModule {}
