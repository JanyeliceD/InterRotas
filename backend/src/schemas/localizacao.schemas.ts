import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LocalizacaoDocument = HydratedDocument<Localizacao>;

@Schema()
export class Localizacao {
    @Prop({ required: true })
    onibusId!: string;

    @Prop({ required: true })
    latitude!: number;

    @Prop({ required: true })
    longitude!: number;
}

export const LocalizacaoSchema = SchemaFactory.createForClass(Localizacao);