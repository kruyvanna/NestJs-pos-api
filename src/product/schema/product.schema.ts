import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Stock } from 'src/stock/schema/stock.schema';
export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  brandName: string;

  @Prop()
  cost: number;

  @Prop({ required: true })
  costPerItem: number;

  @Prop({ required: true })
  pricePerItem: number;

  @Prop({ required: true })
  numberOfItemsInTheBlister;

  @Prop({ required: true })
  numberOfItemsInTheBox: number;

  @Prop({ required: true })
  pricePerBox: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Stock.name }])
  stocks: [Stock];
}
export const ProductSchema = SchemaFactory.createForClass(Product);
