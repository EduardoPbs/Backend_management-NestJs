import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductCategory } from './enum/product-category.enum';
import { ProductController } from './product.controller';
import { StandardReturnDto } from '../dto/standard-return.dto';
import { ShowAllPropsProductDto } from './dto/show-all-props-product.dto';

describe('ProductController', () => {
  let productService: ProductService;
  let productController: ProductController;
  let productRepository: Repository<ProductEntity>;

  beforeEach(() => {
    productRepository = {
      find: jest.fn().mockResolvedValue([]),
      findOneBy: jest.fn().mockResolvedValue({
        id: '84ca58af-4b99-47d9-82e4-e510c4a73512',
        name: 'Bolo',
        code: 9948,
        stock: 9,
        value: 49.99,
        category: 'Frios',
        status: false,
        createdAt: '2024-01-31T11:55:52.963Z',
        updatedAt: null,
        deletedAt: null,
      }),
      delete: jest.fn().mockResolvedValue(null),
    } as unknown as Repository<ProductEntity>;
    productService = new ProductService(productRepository);
    productController = new ProductController(productService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      let result: Promise<ProductEntity[]> = Promise.resolve([]);
      const findAllSpy = jest
        .spyOn(productService, 'findAll')
        .mockImplementation(() => result);

      expect(await productController.findAll()).toEqual(
        new StandardReturnDto('Showing all products', {
          products: await result,
          total: 0,
        }),
      );
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one product by id', async () => {
      const productFounded: ProductEntity = await productService.find(
        '84ca58af-4b99-47d9-82e4-e510c4a73512',
      );

      let result: Promise<ProductEntity> = Promise.resolve(productFounded);
      const findOneBySpy = jest
        .spyOn(productService, 'find')
        .mockImplementation(() => result);

      expect(await productController.findOne(productFounded.id)).toEqual(
        new StandardReturnDto(
          'Product founded.',
          new ShowAllPropsProductDto(
            '84ca58af-4b99-47d9-82e4-e510c4a73512',
            'Bolo',
            9948,
            9,
            49.99,
            ProductCategory.FRIOS,
            false,
            '2024-01-31T11:55:52.963Z',
            null,
            null,
          ),
        ),
      );

      expect(findOneBySpy).toHaveBeenCalledWith(productFounded.id);
    });
  });

  describe('delete', () => {
    it('should delete an product by id', async () => {
      const productFounded: ProductEntity = await productService.find(
        '84ca58af-4b99-47d9-82e4-e510c4a73512',
      );

      const deleteSpy = jest
        .spyOn(productService, 'delete')
        .mockImplementation(() => Promise.resolve());

      expect(await productController.remove(productFounded.id)).toEqual(
        new StandardReturnDto('Product deleted successfully.'),
      );
      expect(deleteSpy).toHaveBeenCalledWith(productFounded.id);
    });
  });
});
