import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockModule } from 'src/stock/stock.module';
import { StockService } from 'src/stock/stock.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    StockModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, Product],
  exports: [Product],
})
export class ProductModule {}
