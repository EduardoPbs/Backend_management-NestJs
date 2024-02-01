import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductService } from './product.service';
import { ProductCategory } from 'src/product/enum/product-category.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { StandardReturnDto } from 'src/dto/standard-return.dto';
import { ShowAllPropsProductDto } from 'src/product/dto/show-all-props-product.dto';
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<StandardReturnDto> {
    const newProduct: ProductEntity =
      await this.productService.create(createProductDto);
    return new StandardReturnDto('Product created successfully.', newProduct);
  }

  @Get()
  async findAll(): Promise<StandardReturnDto> {
    const productsList: ProductEntity[] = await this.productService.findAll();
    return new StandardReturnDto('Showing all products', {
      products: productsList.map(
        (product) =>
          new ShowAllPropsProductDto(
            product.id,
            product.name,
            product.code,
            product.stock,
            Number(product.value),
            product.category,
            product.status,
            product.createdAt,
            product.updatedAt,
            product.deletedAt,
          ),
      ),
      total: productsList.length,
    });
  }

  @Get('categories')
  async categories(): Promise<StandardReturnDto> {
    const categories = Object.values(ProductCategory);
    return new StandardReturnDto('Showing all categories.', categories);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StandardReturnDto> {
    const productFound: ProductEntity = await this.productService.find(id);
    return new StandardReturnDto(
      'Product founded.',
      new ShowAllPropsProductDto(
        productFound.id,
        productFound.name,
        productFound.code,
        productFound.stock,
        Number(productFound.value),
        productFound.category,
        productFound.status,
        productFound.createdAt,
        productFound.updatedAt,
        productFound.deletedAt,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<StandardReturnDto> {
    const productUpdated: ProductEntity = await this.productService.update(
      id,
      data,
    );
    return new StandardReturnDto(
      'Product updated successfully.',
      productUpdated,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<StandardReturnDto> {
    await this.productService.delete(id);
    return new StandardReturnDto('Product deleted successfully.');
  }
}
