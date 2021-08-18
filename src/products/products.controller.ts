import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service'
import { Product } from './product.entity'
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll(); 
  }

  @Get(':id')
  get(@Param() params) {
    return this.productsService.findOne(params.id)
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() product: Product) {
    return this.productsService.create(product)
  }

  @Put(':id')
  update(
    @Param() params,
    @Body() product: Product,
  ) {
    return this.productsService.update(params.id, product)
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.productsService.delete(params.id)
  }
}
