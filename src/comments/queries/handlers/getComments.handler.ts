import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetCommentsQuery } from "../implementaions/getComments.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "src/comments/entities/comment.entity";
import { Repository } from "typeorm";

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRep: Repository<Comment>,
  ){}

  async execute(query: GetCommentsQuery){
    if (query.postId) {
      return this.commentRep.find({
        post: {
          id: query.postId
        }
      })
    }
    return this.commentRep.find()
  }
}