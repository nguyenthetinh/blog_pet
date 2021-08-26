import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryNotFoundException } from './exception/categoryNotFund.exception'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRep: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryRep.create(createCategoryDto)
    await this.categoryRep.save(newCategory)
    return newCategory
  }

  findAll() {
    return this.categoryRep.find({relations: ['posts']})
  }

  async findOne(id: number) {
    const category = await this.categoryRep.findOne(id, {relations:['posts']})
    if (category) {
      return category
    }
    throw new CategoryNotFoundException(id)
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRep.update(id, updateCategoryDto)
    const updateCategory = await this.categoryRep.findOne(id, {relations: ['posts']})
    if (updateCategory) {
      return updateCategory
    }
    throw new CategoryNotFoundException(id)
  }

  async remove(id: number) {
    const removeCategory = await this.categoryRep.delete(id)
    if (!removeCategory.affected) {
      throw new CategoryNotFoundException(id)
    }
  }
}
