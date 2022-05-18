import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Club } from 'src/club/schemas/club.schemas';
import { User } from 'src/user/schemas/user.schema';
export type ProfileDocument = Profile & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class Profile {
  @Prop({ trim: true, uppercase: true })
  name: string;

  @Prop({ trim: true, uppercase: true })
  lastname: string;

  @Prop({ trim: true, uppercase: true })
  description: string;

  @Prop({ trim: true })
  status: boolean;

  @Prop({ trim: true, required: false })
  email?: string;

  @Prop({ trim: true, required: false })
  cellphone_1?: string;

  @Prop({ trim: true, required: false })
  cellphone_2?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updatedBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Club' })
  club: Club;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
