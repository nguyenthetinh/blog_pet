import { Injectable, HttpException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostNotFoundException } from 'src/products/exception/postNotFund.exception';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ){}

  getAllPosts(){
    return this.postRepository.find()
  }

  async getPostId(id: number){
    const post = await this.postRepository.findOne(id)
    if(post){
      return post
    }
    throw new PostNotFoundException(id);
  }

  async create(createPostDto: CreatePostDto) {
    const newPost = await this.postRepository.create(createPostDto)
    await this.postRepository.save(newPost)
    return newPost
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, updatePostDto)
    const updatePost = await this.postRepository.findOne(id)
    if (updatePost) {
      return updatePost
    }
    throw new PostNotFoundException(id)
  }

  async remove(id: number) {
    const deletePost = await this.postRepository.delete(id)
    if(!deletePost.affected){
      throw new PostNotFoundException(id)
    }
  }
}
