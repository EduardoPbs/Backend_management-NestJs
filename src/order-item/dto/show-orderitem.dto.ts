export class ShowOrderItemDto {
  constructor(
    readonly id: string,
    readonly quantity: number,
    readonly total: number,
    readonly productId: string,
  ) {}
}
