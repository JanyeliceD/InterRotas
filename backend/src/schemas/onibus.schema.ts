import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OnibusDocument = HydratedDocument<Onibus>;

@Schema()
export class Onibus {
    @Prop({ required: true, unique: true })
    codigo!: string;

    @Prop({ required: true })
    placa!: string;

    @Prop({ required: true })
    capacidade!: number;

    @Prop({ required: true })
    modelo!: string;
}

export const OnibusSchema = SchemaFactory.createForClass(Onibus);