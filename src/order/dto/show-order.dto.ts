import { ShowOrderItemDto } from '../../order-item/dto/show-orderitem.dto';

export class ShowOrderDto {
  constructor(
    readonly id: string,
    readonly total: number,
    readonly items: ShowOrderItemDto[],
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly deletedAt: string,
  ) {}
}
