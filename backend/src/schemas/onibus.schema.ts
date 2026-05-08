import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OnibusDocument = HydratedDocument<Onibus>;

@Schema()
export class Onibus {
    @Prop({ required: true })
    placa!: string;

    @Prop({ required: true })
    modelo!: string;

    @Prop({ required: true })
    idRota!: string;
}

export const OnibusSchema = SchemaFactory.createForClass(Onibus);