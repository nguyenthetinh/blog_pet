import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity'
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { ProductNotFundException } from './exception/productNotFund.exception'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ){}

  async findAll (): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne(id);
    if (product){
      return product
    }
    throw new ProductNotFundException(id);
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepo.save(product);
  }

  async update(id: number, product: UpdateProductDto){
    await this.productRepo.update(id, product);
    const updateProduct = await this.productRepo.findOne(id)
    if (updateProduct) {
      return updateProduct
    }
    throw new ProductNotFundException(id)
  }
  
  async delete(id): Promise<DeleteResult> {
    return await this.productRepo.delete( id);
  }
}
