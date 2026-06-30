import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConfigDocument = HydratedDocument<Config>;

@Schema()
export class Config {
  @Prop({ type: Number, required: true, default: 5.90 })
  precoDiesel!: number;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);