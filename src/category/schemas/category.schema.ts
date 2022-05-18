import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type CategoryDocument = Category & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true, uppercase: true })
  description: string;

  @Prop({ trim: true })
  status: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
