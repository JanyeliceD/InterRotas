import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LocalizacaoDocument = HydratedDocument<Localizacao>;

@Schema({ timestamps: true })
export class Localizacao {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onibus',
        required: true
    })
    idOnibus!: mongoose.Types.ObjectId;

    @Prop({ required: true })
    latitude!: number;

    @Prop({ required: true })
    longitude!: number;

    @Prop({ default: Date.now })
    dataAtualizacao!: Date;
}

export const LocalizacaoSchema = SchemaFactory.createForClass(Localizacao);