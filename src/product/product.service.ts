import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(data: CreateProductDto): Promise<ProductEntity> {
    const newProduct: ProductEntity = ProductEntity.create(data);
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<ProductEntity[]> {
    const productsList: ProductEntity[] = await this.productRepository.find();
    const productsParsed = JSON.parse(JSON.stringify(productsList));
    return productsParsed;
  }

  async findLastUpdated(): Promise<any> {
    /**@todo implement last product modified */
  }

  async find(id: string): Promise<ProductEntity> {
    const productFound: ProductEntity = await this.findProduct(id);
    const productParsed = JSON.parse(JSON.stringify(productFound));
    return productParsed;
  }

  async update(id: string, data: UpdateProductDto): Promise<ProductEntity> {
    const productFound: ProductEntity = await this.findProduct(id);
    await this.productRepository.update(productFound.id, data);
    const product: ProductEntity = await this.productRepository.findOneBy({
      id: id,
    });
    return product;
  }

  async delete(id: string): Promise<void> {
    const product: ProductEntity = await this.findProduct(id);
    await this.productRepository.delete(product.id);
  }

  async findProduct(id: string): Promise<ProductEntity> {
    const productFound: ProductEntity = await this.productRepository.findOneBy({
      id: id,
    });
    if (productFound !== null) {
      return productFound;
    }
    throw new NotFoundException('Product not found');
  }
}
