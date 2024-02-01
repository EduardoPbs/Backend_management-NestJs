import { ShowOrderItemDto } from 'src/order-item/dto/show-orderitem.dto';
import { OrderItemService } from './order-item.service';
import { OrderItemsEntity } from 'src/order-item/entities/order-item.entity';
import { StandardReturnDto } from 'src/dto/standard-return.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Controller,
} from '@nestjs/common';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post(':id')
  @HttpCode(201)
  async create(
    @Param('id') id: string,
    @Body() data: CreateOrderItemDto,
  ): Promise<StandardReturnDto> {
    const newOrderItem: OrderItemsEntity = await this.orderItemService.create(
      id,
      data,
    );
    return new StandardReturnDto('Item created successfully.', {
      orderId: newOrderItem.order.id,
      product: {
        id: newOrderItem.product.id,
        quantity: data.quantity,
        value: Number(newOrderItem.product.value),
      },
      totalValue: data.quantity * newOrderItem.product.value,
    });
  }

  @Get()
  async findAll(): Promise<StandardReturnDto> {
    const orderItemsList = await this.orderItemService.findAll();
    return new StandardReturnDto('Showing all orders items', {
      items: orderItemsList,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StandardReturnDto> {
    const orderItem: OrderItemsEntity = await this.orderItemService.find(id);
    return new StandardReturnDto(
      'Item founded.',
      new ShowOrderItemDto(
        orderItem.id,
        orderItem.quantity,
        Number(orderItem.totalValue),
        orderItem.product.id,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    const updatedItem: OrderItemsEntity = await this.orderItemService.update(
      id,
      updateOrderItemDto,
    );
    return new StandardReturnDto(
      'Item updated successfully.',
      new ShowOrderItemDto(
        updatedItem.id,
        updatedItem.quantity,
        Number(updatedItem.totalValue),
        updatedItem.product.id,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<StandardReturnDto> {
    await this.orderItemService.delete(id);
    return new StandardReturnDto('Order Item deleted successfully.');
  }
}
