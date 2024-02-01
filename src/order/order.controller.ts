import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderService } from './order.service';
import { ShowOrderDto } from 'src/order/dto/show-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ShowOrderItemDto } from 'src/order-item/dto/show-orderitem.dto';
import { OrderItemsEntity } from 'src/order-item/entities/order-item.entity';
import { StandardReturnDto } from 'src/dto/standard-return.dto';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(): Promise<StandardReturnDto> {
    const newOrderId = await this.orderService.create();
    return new StandardReturnDto('Order created successfully.', {
      id: newOrderId,
    });
  }

  @Get()
  async findAll(): Promise<StandardReturnDto> {
    const ordersList = await this.orderService.findAll();
    return new StandardReturnDto('Orders List', {
      orders: ordersList,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StandardReturnDto> {
    const orderFounded = await this.orderService.findOne(id);
    return new StandardReturnDto(
      'Order founded.',
      new ShowOrderDto(
        orderFounded.id,
        Number(orderFounded.total),
        orderFounded.orderItems.map(
          (item: OrderItemsEntity) =>
            new ShowOrderItemDto(
              item.id,
              item.quantity,
              Number(item.totalValue),
              item.product.id,
            ),
        ),
        orderFounded.createdAt,
        orderFounded.updatedAt,
        orderFounded.deletedAt,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<StandardReturnDto> {
    const updatedOrder: OrderEntity = await this.orderService.update(
      id,
      updateOrderDto,
    );
    return new StandardReturnDto('Order updated successfully.', {
      updatedOrder,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<StandardReturnDto> {
    await this.orderService.delete(id);
    return new StandardReturnDto('Order deleted successfully.');
  }
}
