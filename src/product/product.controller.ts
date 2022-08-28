import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Stock } from 'src/stock/schema/stock.schema';
import { ProductService } from './product.service';
import { Product } from './schema/product.schema';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: Product) {
    return this.productService.create(data);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('/id-with-stock/:id')
  findByIdWithStock(@Param('id') id: string) {
    return this.productService.findByIdWithStock(id);
  }

  @Get('/code/:code')
  findByCode(@Param('code') code: string) {
    return this.productService.findByCode(code);
  }

  @Get('/code-with-stocks/:code')
  findByCodeWithStock(@Param('code') code: string) {
    return this.productService.findByCodeWithStocks(code);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: Product) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  // Stock relation
  @Post('/add-stock/:id')
  addStock(@Param('id') id: string, @Body() stock: Stock) {
    return this.productService.addStock(id, stock);
  }

  @Delete('/remove-stock/:productId/:stockId')
  removeStock(
    @Param('productId') productId: string,
    @Param('stockId') stockId: string,
  ) {
    return this.productService.removeStock(productId, stockId);
  }

  @Get('/with-stocks')
  getProductWithStocks() {
    return this.productService.getProductWithStocks();
  }

  @Get('/code-with-stock/:code')
  getProductByCodeWithStocks(@Param('code') code: string) {
    return this.productService.findByCodeWithStocks(code);
  }
}
