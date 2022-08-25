import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
export type StockDocument = Stock & Document;
@Schema({ timestamps: true })
export class Stock {
  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  remaining: number;

  @Prop({ required: true })
  costPerItem: number;
}
export const StockSchema = SchemaFactory.createForClass(Stock);
