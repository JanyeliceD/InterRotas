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
        type: String,
        required: true 
    })
    idMotorista!: string;

    @Prop({ 
        type: String,
        required: true 
    })
    idOnibus!: string; 

    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parada'
        }],
        required: true
    })
    paradas!: mongoose.Types.ObjectId[];

    @Prop({ type: Number, required: false, default: 0 }) // Define como número e começa em 0 se não enviado
    quilometragem!: number;
}

export const RotaSchema = SchemaFactory.createForClass(Rota);