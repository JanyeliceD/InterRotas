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

    // @Prop({ 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Rota',
    //     required: true 
    // })
    // idRota!: mongoose.Types.ObjectId;
}

export const OnibusSchema = SchemaFactory.createForClass(Onibus);