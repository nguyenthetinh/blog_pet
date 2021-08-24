import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseFilters } from '@nestjs/common';
import { ProductsService } from './products.service'
import { Product } from './product.entity'
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';
import { FindOneParams } from 'src/utils/findOneParams';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll(); 
  }

  @Get(':id')
  @UseFilters(ExceptionsLoggerFilter)
  get(@Param() {id}: FindOneParams) {
    return this.productsService.findOne(Number(id))
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() product: Product) {
    return this.productsService.create(product)
  }

  @Put(':id')
  update(
    @Param() params,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.update(params.id, product)
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.productsService.delete(params.id)
  }
}
