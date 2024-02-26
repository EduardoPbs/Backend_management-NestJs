import { ProductCategory } from '../enum/product-category.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be type string' })
  @IsNotEmpty({ message: 'Name cannot be null' })
  name: string;

  @Min(0, { message: 'Code must be greater than or equal to 0' })
  @IsNotEmpty({ message: 'Code cannot be null' })
  code: number;

  @Min(0, { message: 'Stock must be greater than or equal to 0' })
  @IsNotEmpty({ message: 'Stock cannot be null' })
  stock: number;

  @Min(0, { message: 'Value must be greater than or equal to 0' })
  @IsNotEmpty({ message: 'Value cannot be null' })
  @IsNumber({maxDecimalPlaces: 2})
  value: number;

  @IsEnum(ProductCategory)
  @IsNotEmpty({ message: 'Category cannot be null' })
  category: ProductCategory;
}
