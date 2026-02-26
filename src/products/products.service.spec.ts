import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockProductRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product successfully', async () => {
      const createProductDto = { title: 'Test Product', price: 100 };
      const product = { id: 'uuid', ...createProductDto };

      mockProductRepository.create.mockReturnValue(product);
      mockProductRepository.save.mockReturnValue(product);

      const result = await service.create(createProductDto);

      expect(result).toEqual(product);
      expect(mockProductRepository.create).toHaveBeenCalledWith(createProductDto);
      expect(mockProductRepository.save).toHaveBeenCalledWith(product);
    });

    it('should throw BadRequestException on duplicate title (Postgres error 23505)', async () => {
      const createProductDto = { title: 'Duplicate Product' };
      const error = { code: '23505', detail: 'Key (title)=(Duplicate Product) already exists.' };

      mockProductRepository.create.mockReturnValue(createProductDto);
      mockProductRepository.save.mockRejectedValue(error);

      await expect(service.create(createProductDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const product = { id: 'uuid', title: 'Test Product' };
      mockProductRepository.findOneBy.mockReturnValue(product);

      const result = await service.findOne('uuid');

      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductRepository.findOneBy.mockReturnValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product successfully', async () => {
      const product = { id: 'uuid', title: 'Test Product' };
      mockProductRepository.findOneBy.mockReturnValue(product);
      mockProductRepository.remove.mockReturnValue({ deleted: true });

      const result = await service.remove('uuid');

      expect(result).toEqual({ deleted: true });
      expect(mockProductRepository.remove).toHaveBeenCalledWith(product);
    });
  });
});
