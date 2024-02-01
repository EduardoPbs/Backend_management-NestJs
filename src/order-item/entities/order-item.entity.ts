import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_items' })
export class OrderItemsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'total_value', nullable: false, type: 'decimal' })
  totalValue: number;

  @ManyToOne(() => ProductEntity, (product) => product.orderItem, {
    eager: true,
  })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  static async create(
    order: OrderEntity,
    product: ProductEntity,
    quantity: number,
  ): Promise<OrderItemsEntity> {
    const newOrderItem = new OrderItemsEntity();
    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = quantity;
    newOrderItem.totalValue = quantity * product.value;
    return newOrderItem;
  }
}
