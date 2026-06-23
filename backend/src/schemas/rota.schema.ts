import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RotaDocument = HydratedDocument<Rota>;

@Schema()
export class Rota {
    @Prop({ required: true, unique: true })
    codigo!: string;


    @Prop({ required: true })
    nome!: string;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'motorista',
        required: true 
    })
    idMotorista!: mongoose.Types.ObjectId;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onibus',
        required: true 
    })
    idOnibus!: mongoose.Types.ObjectId;

    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parada'
        }],
        required: true
    })
    paradas!: mongoose.Types.ObjectId[];
}

export const RotaSchema = SchemaFactory.createForClass(Rota);