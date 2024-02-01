import { IsNotEmpty, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @Min(0, { message: 'Quantity must be at least 1.' })
  quantity: number;

  @IsNotEmpty()
  productId: string;
}
