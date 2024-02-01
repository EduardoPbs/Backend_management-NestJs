import { IsNotEmpty, Min } from 'class-validator';

export class UpdateOrderItemDto {
  @IsNotEmpty({ message: 'ProductId cannot be null' })
  productId: string;

  @IsNotEmpty({ message: 'Quantity cannot be null' })
  @Min(0, { message: 'Quantity must be greater than or equal to 0' })
  quantity: number;
}
