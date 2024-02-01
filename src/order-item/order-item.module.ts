import { Module } from '@nestjs/common';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { OrderItemsEntity } from 'src/order-item/entities/order-item.entity';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemsEntity, OrderEntity, ProductEntity]),
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderService, ProductService],
})
export class OrderItemModule {}
