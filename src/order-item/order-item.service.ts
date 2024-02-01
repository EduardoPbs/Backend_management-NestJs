import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { OrderItemsEntity } from 'src/order-item/entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowOrderItemDto } from 'src/order-item/dto/show-orderitem.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItemsEntity)
    private readonly orderItemsRepository: Repository<OrderItemsEntity>,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  async create(
    orderId: string,
    data: CreateOrderItemDto,
  ): Promise<OrderItemsEntity> {
    const orderFounded = await this.orderService.findOrder(orderId);
    const productFounded = await this.productService.findProduct(
      data.productId,
    );

    if (data.quantity > productFounded.stock) {
      throw new BadRequestException('Sem estoque suficiente.');
    }
    await this.productService.update(productFounded.id, {
      stock: productFounded.stock - data.quantity,
    });

    const newOrderItem = await OrderItemsEntity.create(
      orderFounded,
      productFounded,
      data.quantity,
    );
    orderFounded.orderItems.push(newOrderItem);

    const totalOrder = orderFounded.orderItems.reduce(
      (acc, order) => acc + Number(order.product.value) * order.quantity,
      0.0,
    );

    await this.orderService.update(orderFounded.id, {
      total: totalOrder,
    });

    return await this.orderItemsRepository.save(newOrderItem);
  }

  async findAll(): Promise<ShowOrderItemDto[]> {
    const orderItemsList: OrderItemsEntity[] =
      await this.orderItemsRepository.find();

    const parsedItemsList: ShowOrderItemDto[] = orderItemsList.map(
      (item: OrderItemsEntity) =>
        new ShowOrderItemDto(
          item.id,
          item.quantity,
          Number(item.totalValue),
          item.product.id,
        ),
    );

    return parsedItemsList;
  }

  async find(id: string): Promise<OrderItemsEntity> {
    const itemFounded: OrderItemsEntity = await this.findItem(id);
    const itemParsed = JSON.parse(JSON.stringify(itemFounded));
    return itemParsed;
  }

  async update(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItemsEntity> {
    const itemFounded = await this.findItem(id);
    let product: ProductEntity;

    if (itemFounded.product.id === updateOrderItemDto.productId) {
      product = itemFounded.product;
    } else {
      product = await this.productService.findProduct(
        updateOrderItemDto.productId,
      );
    }

    await this.orderItemsRepository.update(itemFounded.id, {
      quantity: updateOrderItemDto.quantity,
      totalValue: updateOrderItemDto.quantity * product.value,
      product: product,
    });
    const item: OrderItemsEntity = await this.orderItemsRepository.findOneBy({
      id: id,
    });
    return item;
  }

  async delete(id: string): Promise<void> {
    const itemFounded = await this.findItem(id);
    await this.orderItemsRepository.delete(itemFounded.id);
  }

  async findItem(id: string): Promise<OrderItemsEntity> {
    const orderItemFounded: OrderItemsEntity =
      await this.orderItemsRepository.findOneBy({ id: id });
    if (orderItemFounded !== null) {
      return orderItemFounded;
    }
    throw new NotFoundException('OrderItem not found');
  }
}
