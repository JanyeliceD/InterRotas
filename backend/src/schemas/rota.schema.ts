import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RotaDocument = HydratedDocument<Rota>;

@Schema()
export class Rota {
    @Prop({ required: true })
    idOnibus!: string;

    @Prop({ required: true })
    nome!: string;

    @Prop({ required: true })
    motorista!: string;

    @Prop({ required: true })
    paradas!: Array<string>;

    @Prop({ required: true })
    origem!: Array<string>;

    @Prop({ required: true })
    destino!: Array<string>;
}

export const RotaSchema = SchemaFactory.createForClass(Rota);