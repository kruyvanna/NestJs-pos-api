import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  cost: number;

  @Prop({ required: true })
  costPerItem: number;

  @Prop({ required: true })
  pricePerItem: number;

  @Prop({ required: true })
  numberOfItemsInTheBox: number;

  @Prop({ required: true })
  pricePerBox: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
