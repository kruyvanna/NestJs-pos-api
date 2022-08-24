import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock, StockDocument } from './schema/stock.schema';

@Injectable()
export class StockService {
  @InjectModel(Stock.name) private model: Model<StockDocument>;

  create(data: Stock) {
    return this.model.create(data);
  }
  findAll() {
    return this.model.find();
  }
  findOne(id: string) {
    return this.model.findById(id);
  }
  update(id: string, data: Stock) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }
}
