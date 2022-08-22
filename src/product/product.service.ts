import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  @InjectModel(Product.name) private model: Model<ProductDocument>;

  create(data: Product) {
    return this.model.create(data);
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  findByCode(code: string) {
    return this.model.findOne({ code: code });
  }

  update(id: string, product: Product) {
    return this.model.findByIdAndUpdate(id, product, { new: true });
  }
  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }
}
