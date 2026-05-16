import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RotaDocument = HydratedDocument<Rota>;

@Schema()
export class Rota {
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onibus',
        required: true 
    })
    idOnibus!: mongoose.Types.ObjectId;

    @Prop({ required: true })
    nome!: string;

    @Prop({ required: true })
    motorista!: string;

    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parada'
        }],
        required: true
    })
    paradas!: mongoose.Types.ObjectId[];

    @Prop({ required: true })
    origem!: string;

    @Prop({ required: true })
    destino!: string;
}

export const RotaSchema = SchemaFactory.createForClass(Rota);