import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  create(@Body() data: Order) {
    return this.orderService.create(data);
  }
  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: Order) {
    return this.orderService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.delete(id);
  }

  @Post('/aggregate-by-day')
  aggreegateByDay(@Body() data: any) {
    const { from, to } = data;
    return this.orderService.getOrderSummaryByDay(from, to);
  }
}
