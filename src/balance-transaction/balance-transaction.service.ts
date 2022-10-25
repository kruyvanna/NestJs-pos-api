import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BalanceTransaction,
  BalanceTransactionDocument,
  BalanceTransactionSchema,
} from './schema';

@Injectable()
export class BalanceTransactionService {
  @InjectModel(BalanceTransaction.name)
  private model: Model<BalanceTransactionDocument>;

  create(data: BalanceTransaction) {
    return this.model.create(data);
  }
  findAll() {
    return this.model.find();
  }
  findOne(id: string) {
    return this.model.findById(id);
  }
  update(id: string, data: BalanceTransaction) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id: string) {
    return this.model.findByIdAndRemove(id);
  }

  getByDateRange(from, to) {
    return this.model.find({
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });
  }
}
