import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostNotFoundException } from './exception/postNotFund.exception';
import { User } from 'src/users/entities/user.entity';
import { paginateResponse } from 'src/utils/types/paginateResponse';
import { Cache } from 'cache-manager'
import { GET_POSTS_CACHE_KEY } from './postsCacheKey.constant';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ){}

  async clearCache(){
    const keys: string[] = await this.cacheManager.store.keys();
    keys.forEach((key) => {
      if (key.startsWith(GET_POSTS_CACHE_KEY)) {
        this.cacheManager.del(key)
      }
    })
  }

  async getAllPosts(page?: number, limit?: number){
    page = page || 1;
    limit = limit || 10
    const skip = (page - 1) * limit ;

    const data = await this.postRepository.findAndCount({ 
      relations: ['author', 'categories', 'comments'],
      order: {id: "ASC"},
      skip: skip,
      take: limit
    })
    return paginateResponse(data, Number(page), Number(limit))
  }

  async getPostId(id: number){
    const post = await this.postRepository.findOne(id, {relations: ['author', 'categories']})
    if(post){
      return post
    }
    throw new PostNotFoundException(id);
  }

  async create(createPostDto: CreatePostDto, user: User) {
    const newPost = await this.postRepository.create({
      ...createPostDto,
      author: user
    })
    await this.postRepository.save(newPost)
    await this.clearCache()
    return newPost
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, updatePostDto)
    const updatePost = await this.postRepository.findOne(id, { relations: ['author'] })
    if (updatePost) {
      await this.clearCache()
      return updatePost
    }
    throw new PostNotFoundException(id)
  }

  async remove(id: number) {
    const deletePost = await this.postRepository.delete(id)
    if(!deletePost.affected){
      throw new PostNotFoundException(id)
    }
    await this.clearCache()
  }
}
