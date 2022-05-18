import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Sede } from 'src/sede/schemas/sede.schema';
import { User } from 'src/user/schemas/user.schema';
export type ClubDocument = Club & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Club {
  @Prop({ trim: true, uppercase: true })
  name: string;

  @Prop({ trim: true })
  status: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sede' })
  sede: Sede;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ClubSchema = SchemaFactory.createForClass(Club);
