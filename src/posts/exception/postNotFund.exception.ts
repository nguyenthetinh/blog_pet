import { NotFoundException } from "@nestjs/common";

export class PostNotFoundException extends NotFoundException {
  constructor(postId: number) {
    super(`post with id ${postId} not found`);
  }
}