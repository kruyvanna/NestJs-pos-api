import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  role: string;

  @Prop({ required: false, default: false })
  revoked: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);

// Mongoose used to define this before mongoose 6. For backward's compatibility, we will now just define it ourselves.
export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
