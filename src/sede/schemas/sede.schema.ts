import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type SedeDocument = Sede & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Sede {
  @Prop({ trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  status: boolean;
}

export const SedeSchema = SchemaFactory.createForClass(Sede);
