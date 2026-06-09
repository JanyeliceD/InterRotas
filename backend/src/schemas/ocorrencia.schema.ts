import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OcorrenciaDocument = HydratedDocument<Ocorrencia>;

@Schema()
export class Ocorrencia {
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onibus',
        required: true 
    })
    idOnibus!: mongoose.Types.ObjectId;

    @Prop({ required: true })
    tipo!: 'FALHA_MECANICA' | 'PNEU_FURADO' | 'ACIDENTE' | 'TRANSITO' | 'OUTRO';

    @Prop()
    descricao?: string;

    @Prop({ required: true })
    status!: 'ABERTA' | 'EM_ANDAMENTO' | 'RESOLVIDA';

    @Prop({ default: Date.now })
    dataCriacao!: Date;

    @Prop()
    observacaoAdmin?: string;

}

export const OcorrenciaSchema = SchemaFactory.createForClass(Ocorrencia);