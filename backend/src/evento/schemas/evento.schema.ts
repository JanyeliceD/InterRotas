import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventoDocument = Evento & Document;

@Schema()
export class Evento {
    @Prop({ required: true })
    onibusId!: number;

    @Prop({ required: true })
    paradaId!: number;

    @Prop({ required: true })
    timestamp!: string;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);