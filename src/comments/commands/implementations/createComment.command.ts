import { CreateCommentDto } from "../../dto/create-comment.dto";
import { User } from "src/users/entities/user.entity";

export class CreateCommentCommand {
  constructor(
    public readonly comment: CreateCommentDto,
    public readonly user: User,
  ) {}
}