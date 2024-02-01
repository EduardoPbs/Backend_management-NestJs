import { ProductCategory } from 'src/product/enum/product-category.enum';

export class ShowAllPropsProductDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly code: number,
    readonly stock: number,
    readonly value: number,
    readonly category: ProductCategory,
    readonly status: boolean,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly deletedAt: string,
  ) {}
}
