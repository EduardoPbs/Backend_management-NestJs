import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderItemModule } from './order-item/order-item.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { UniqueFieldException } from 'src/filters/unique-field-exception.filter';

@Module({
  imports: [
    OrderModule,
    ProductModule,
    OrderItemModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  providers: [UniqueFieldException]
})
export class AppModule {}
