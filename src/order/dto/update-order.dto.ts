import { IsNotEmpty, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty({ message: 'Total cannot be null' })
  @Min(0, { message: 'Total must be greater than or equal to 0' })
  total: number;
}
