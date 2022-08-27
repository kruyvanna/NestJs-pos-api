import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrderService {
  @InjectModel(Order.name) private model: Model<OrderDocument>;

  create(data: Order) {
    return this.model.create(data);
  }
  findAll() {
    return this.model.find();
  }
  findOne(id: string) {
    return this.model.findById(id);
  }
  update(id: string, data: Order) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }
}
