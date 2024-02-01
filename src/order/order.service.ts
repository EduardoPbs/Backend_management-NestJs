import { Repository } from 'typeorm';
import { OrderEntity } from '../order/entities/order.entity';
import { ShowOrderDto } from './dto/show-order.dto';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';
import { OrderItemsEntity } from 'src/order-item/entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowOrderItemDto } from 'src/order-item/dto/show-orderitem.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async create(): Promise<string> {
    const newOrder = await this.orderRepository.save(new OrderEntity());
    return newOrder.id;
  }

  async findAll(): Promise<ShowOrderDto[]> {
    const ordersList: OrderEntity[] = await this.orderRepository.find();

    const parsedOrders: ShowOrderDto[] = ordersList.map(
      (order: OrderEntity) => {
        const itemsList: ShowOrderItemDto[] = order.orderItems.map(
          (item: OrderItemsEntity) =>
            new ShowOrderItemDto(
              item.id,
              item.quantity,
              Number(item.totalValue),
              item.product.id,
            ),
        );

        return new ShowOrderDto(
          order.id,
          Number(order.total),
          itemsList,
          order.createdAt,
          order.updatedAt,
          order.deletedAt,
        );
      },
    );

    return parsedOrders;
  }

  async findOne(id: string): Promise<OrderEntity> {
    const orderFounded = await this.findOrder(id);
    const orderParsed = JSON.parse(JSON.stringify(orderFounded));
    return orderParsed;
  }

  async update(id: string, data: UpdateOrderDto): Promise<OrderEntity> {
    const orderFounded: OrderEntity = await this.findOrder(id);
    await this.orderRepository.update(orderFounded.id, data);
    const order: OrderEntity = await this.orderRepository.findOneBy({
      id: id,
    });
    return order;
  }

  async delete(id: string): Promise<void> {
    const orderFounded = await this.findOrder(id);
    await this.orderRepository.delete(orderFounded.id);
  }

  async findOrder(id: string): Promise<OrderEntity> {
    const orderFounded = await this.orderRepository.findOneBy({ id: id });
    if (orderFounded !== null) {
      return orderFounded;
    }
    throw new NotFoundException('Order not found');
  }
}
