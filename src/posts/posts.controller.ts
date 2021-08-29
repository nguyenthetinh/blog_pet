import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, UseInterceptors, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/common';
import { PostsService } from './posts.service';
import { FindOneParams } from 'src/utils/findOneParams';
import { CreatePostDto } from './dto/create-post.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { UpdatePostDto } from './dto/update-post.dto';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
import { PaginationParams } from 'src/utils/types/paginationParams';
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(GET_POSTS_CACHE_KEY)
  @CacheTTL(120)
  @Get()
  getAllPost( @Query() {page, limit}: PaginationParams){
    return this.postsService.getAllPosts(page, limit)
  }

  @Get(':id')
  getPostById(@Param() {id}: FindOneParams){
    return this.postsService.getPostId(Number(id))
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser){
    return this.postsService.create(post, req.user)
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
