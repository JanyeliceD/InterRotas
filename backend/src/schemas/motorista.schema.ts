import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MotoristaDocument = HydratedDocument<Motorista>;

@Schema()
export class Motorista {
    @Prop({ required: true, unique: true })
    matricula!: string;

    @Prop({ required: true })
    nome!: string;

    @Prop({ required: true })
    cpf!: string;

    @Prop({ required: true })
    cnh!: string;

    @Prop({ required: true })
    email!: string;

    @Prop({ required: true })
    telefone!: string;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onibus',
        required: true 
    })
    idOnibus!: mongoose.Types.ObjectId;
}

export const MotoristaSchema = SchemaFactory.createForClass(Motorista);