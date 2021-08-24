import { NotFoundException } from "@nestjs/common";

export class PostNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`product with id ${postId} not found`);
  }
}