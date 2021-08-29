import { Controller, Get, Post, Body, UseGuards, Req, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateCommentCommand } from './commands/implementations/createComment.command';
import { GetCommentsDto } from './dto/getComments.dto';
import { GetCommentsQuery } from './queries/implementaions/getComments.query';

@Controller('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createComment(@Body() comment: CreateCommentDto, @Req() req: RequestWithUser) {
    const user = req.user;
    return this.commandBus.execute(
      new CreateCommentCommand(comment, user)
    )
  }

  @Get()
  async getCommnets(@Query() { postId }: GetCommentsDto) {
    return this.queryBus.execute(
      new GetCommentsQuery(postId)
    )
  }
}
