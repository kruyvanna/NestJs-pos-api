import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop()
  cost: number;
  @Prop({ required: true })
  code: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
