import { NotFoundException } from "@nestjs/common";

export class ProductNotFundException extends NotFoundException {
  constructor(productId: number) {
    super(`product with id ${productId} not found`);
  }
}