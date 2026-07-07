import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  usuario!: string; // O que a pessoa digita no campo "Usuário" do React Native

  @Prop({ required: true })
  senha!: string; // A senha de acesso

  @Prop({ required: true, enum: ['admin', 'motorista'] })
  role!: string; // Define o tipo de tela que o React Native vai abrir
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

   
