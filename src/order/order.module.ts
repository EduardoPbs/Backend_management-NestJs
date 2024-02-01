import { Module } from '@nestjs/common';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
