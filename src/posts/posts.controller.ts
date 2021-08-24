import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { FindOneParams } from 'src/utils/findOneParams';
import { CreatePostDto } from './dto/create-post.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPost(){
    return this.postsService.getAllPosts()
  }

  @Get(':id')
  getPostById(@Param() {id}: FindOneParams){
    return this.postsService.getPostId(Number(id))
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createPost(@Body() post: CreatePostDto){
    return this.postsService.create(post)
  }

  @Patch(':id')
  updatePost(@Param() {id}: FindOneParams, @Body() post: UpdatePostDto){
    return this.postsService.update(Number(id), post)
  }

  @Delete(':id')
  deletePost(@Param() {id}: FindOneParams){
    return this.postsService.remove(Number(id))
  }
}
