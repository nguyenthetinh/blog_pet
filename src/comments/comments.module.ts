import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCommentCommand } from './commands/implementations/createComment.command';
import { GetCommentsHandler } from './queries/handlers/getComments.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
  controllers: [CommentsController],
  providers: [CreateCommentCommand, GetCommentsHandler]
})
export class CommentsModule {}
