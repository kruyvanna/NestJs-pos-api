import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { BalanceTransactionService } from './balance-transaction.service';
import { BalanceTransaction } from './schema';

@Controller('api/balance-transactions')
export class BalanceTransactionController {
  constructor(private readonly service: BalanceTransactionService) {}
  @Post()
  create(@Body() data: BalanceTransaction) {
    return this.service.create(data);
  }
  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: BalanceTransaction) {
    return this.service.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Post('/by-date-range')
  getByDateRange(@Body() data) {
    return this.service.getByDateRange(data.from, data.to);
  }
}
