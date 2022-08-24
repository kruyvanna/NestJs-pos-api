import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Stock } from './schema/stock.schema';
import { StockService } from './stock.service';

@Controller('api/stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}
  @Post()
  create(@Body() data: Stock) {
    return this.stockService.create(data);
  }
  @Get()
  findAll() {
    return this.stockService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }
  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: Stock) {
    return this.stockService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.delete(id);
  }
}
