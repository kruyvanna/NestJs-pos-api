import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceTransactionController } from './balance-transaction.controller';
import { BalanceTransactionService } from './balance-transaction.service';
import { BalanceTransaction, BalanceTransactionSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BalanceTransaction.name, schema: BalanceTransactionSchema },
    ]),
  ],
  controllers: [BalanceTransactionController],
  providers: [BalanceTransactionService],
})
export class BalanceTransactionModule {}
