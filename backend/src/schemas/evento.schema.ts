import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type EventoDocument = HydratedDocument<Evento>;

@Schema()
export class Evento {
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onibus',
        required: true 
    })
    onibusId!: mongoose.Types.ObjectId;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onibus',
        required: true 
    })
    paradaId!: mongoose.Types.ObjectId;

    @Prop({ required: true })
    timestamp!: string;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);