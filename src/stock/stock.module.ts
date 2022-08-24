import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './schema/stock.schema';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
