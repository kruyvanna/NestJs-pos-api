import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  cartItems: [object];

  @Prop({ required: true, default: 0 })
  earning: number;

  @Prop({ required: true })
  total: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
