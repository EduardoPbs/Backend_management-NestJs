import { ProductCategory } from 'src/product/enum/product-category.enum';
import { OrderItemsEntity } from 'src/order-item/entities/order-item.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'code', nullable: false, unique: true })
  code: number;

  @Column({ name: 'stock', nullable: false })
  stock: number;

  @Column({ name: 'value', nullable: false, type: 'decimal' })
  value: number;

  @Column({ name: 'category', enum: ProductCategory, nullable: false })
  category: ProductCategory;

  @Column({ name: 'status', nullable: false, default: false })
  status: boolean;

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.product, {
    cascade: ['update'],
  })
  orderItem: OrderItemsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  static create(data: CreateProductDto): ProductEntity {
    const product: ProductEntity = new ProductEntity();
    product.name = data.name;
    product.code = data.code;
    product.stock = data.stock;
    product.value = data.value;
    product.category = data.category;
    product.createdAt = new Date().toISOString();
    return product;
  }
}
