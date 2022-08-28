import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { Model } from 'mongoose';
import { Stock } from 'src/stock/schema/stock.schema';
import { StockService } from 'src/stock/stock.service';
import { threadId } from 'worker_threads';

@Injectable()
export class ProductService {
  constructor(private readonly stockService: StockService) {}

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

  findByIdWithStock(id: string) {
    return this.model.findById(id).populate('stocks');
  }

  findByCode(code: string) {
    return this.model.findOne({ code: code });
  }

  findByCodeWithStocks(code: string) {
    return this.model.findOne({ code: code }).populate('stocks');
  }

  update(id: string, product: Product) {
    return this.model.findByIdAndUpdate(id, product, { new: true });
  }
  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }

  // Stock

  async addStock(productId: string, stock: Stock) {
    const addedStock = await this.stockService.create(stock);

    const updatedProduct = this.model
      .findByIdAndUpdate(
        productId,
        { $addToSet: { stocks: addedStock._id } },
        { new: true },
      )
      .populate('stocks');

    return updatedProduct;
  }

  async removeStock(productId: string, stockId: string) {
    const updatedProduct = this.model
      .findByIdAndUpdate(
        productId,
        {
          $pull: { stocks: stockId },
        },
        { new: true },
      )
      .populate('stocks');
    return updatedProduct;
  }

  getProductWithStocks() {
    return this.model.find().populate('stocks');
  }
}
