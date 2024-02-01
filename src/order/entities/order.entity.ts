import { OrderItemsEntity } from 'src/order-item/entities/order-item.entity';
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total', nullable: false, type: 'decimal', default: 0.0 })
  total: number;

  @OneToMany(() => OrderItemsEntity, (orderItem) => orderItem.order, {
    eager: true,
  })
  orderItems: OrderItemsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
