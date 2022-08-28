import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderSchema } from './schema/order.schema';

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

  async getOrderSummaryByDay(from: string, to: string) {
    console.log('getOrderSummaryByDay :', from, to);
    // const result = this.model
    //   .aggregate(
    //     [
    //       {
    //         $match: {
    //           createdAt: {
    //             $gte: new Date(from),
    //             $lte: new Date(to),
    //           },
    //         },
    //       },
    //       {
    //         $group: {
    //           _id: {
    //             month: { $month: '$createdAt' },
    //             day: { $dayOfMonth: '$createdAt' },
    //             year: { $year: '$createdAt' },
    //           },
    //           earning: { $sum: '$earning' },
    //           count: { $sum: 1 },
    //         },
    //       },
    //     ],
    //     { cursor: { batchSize: 0 } },
    //   )
    //   .cursor();
    // console.log('result', result);

    const result = this.model
      .aggregate([{ $match: { earning: { $gte: 0 } } }])
      .cursor();
    for await (const doc of result) {
      console.log(doc);
    }
  }
}
