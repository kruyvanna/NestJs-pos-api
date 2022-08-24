import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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

  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Owner.name }])
  // owners: [Owner];
}
export const ProductSchema = SchemaFactory.createForClass(Product);
