import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParadaDocument = HydratedDocument<Parada>;

@Schema()
export class Parada {
    @Prop({ required: true })
    nome!: string;

    @Prop({ required: true })
    endereco!: string;

    @Prop({ required: true })
    latitude!: number;

    @Prop({ required: true })
    longitude!: number;
}

export const ParadaSchema = SchemaFactory.createForClass(Parada);