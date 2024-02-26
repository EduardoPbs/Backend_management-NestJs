import { PartialType } from '@nestjs/mapped-types';
import { ProductCategory } from '../enum/product-category.enum';
import { CreateProductDto } from './create-product.dto';
import { Min, IsEnum, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be null' })
  @IsString({ message: 'Name must be type string' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Code cannot be null' })
  @Min(0, { message: 'Code must be greater than or equal to 0' })
  code?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Stock cannot be null' })
  @Min(0, { message: 'Stock must be greater than or equal to 0' })
  stock?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Value cannot be null' })
  @Min(0, { message: 'Value must be greater than or equal to 0' })
  value?: number;

  @IsOptional()
  @IsEnum(ProductCategory)
  @IsNotEmpty({ message: 'Category cannot be null' })
  category?: ProductCategory;
}
