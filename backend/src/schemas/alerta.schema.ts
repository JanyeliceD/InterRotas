import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AlertaDocument = HydratedDocument<Alerta>;

@Schema()
export class Alerta {
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onibus',
        required: true 
    })
    idOnibus!: mongoose.Types.ObjectId;

    @Prop({ required: true })
    tipo!: 'DESVIO_ROTA' | 'ATRASO' | 'LOTACAO' | 'OUTRO';

    @Prop()
    descricao?: string;

    @Prop({ required: true })
    nivel!: 'BAIXO' | 'MEDIO' | 'ALTO';

    @Prop({ default: Date.now})
    dataCriacao!: Date;
}

export const AlertaSchema = SchemaFactory.createForClass(Alerta);