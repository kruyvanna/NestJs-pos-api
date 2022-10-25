import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
export type BalanceTransactionDocument = BalanceTransaction & Document;

@Schema({ timestamps: true })
export class BalanceTransaction {
  @Prop({ required: true, default: 0 })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  type: string;
}
export const BalanceTransactionSchema =
  SchemaFactory.createForClass(BalanceTransaction);
