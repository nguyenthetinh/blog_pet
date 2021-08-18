import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity'
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

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
    return await this.productRepo.findOne(id);
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepo.save(product);
  }

  async update(id: number, product: Product): Promise<UpdateResult> {
    return await this.productRepo.update(id, product);
  }
  
  async delete(id): Promise<DeleteResult> {
    return await this.productRepo.delete( id);
  }
}
