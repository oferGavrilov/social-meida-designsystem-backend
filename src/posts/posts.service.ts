/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Post as IPost } from './posts.module';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
      private posts: IPost[] = [];

      create (postData: CreatePostDto, userId: number): IPost {
            const newPost = {
                  ...postData,
                  id: Date.now(),
                  authorId: userId,
                  createdAt: new Date(),
                  updatedAt: new Date(),
            }
            this.posts.push(newPost);
            return newPost;
      }

      getAllPosts (): IPost[] {
            return this.posts;
      }

      getPostById (id: number): IPost {
            const post = this.posts.find((post) => post.id === id);
            if (!post) {
                  throw new NotFoundException('Post not found');
            }
            return post;
      }

      update (id: number, userId: number, updateData: UpdatePostDto): IPost {
            const post = this.getPostById(id);
            if (post.authorId !== userId) {
                  throw new UnauthorizedException('You are not authorized to edit this post');
            }

            post.updatedAt = new Date();
            Object.assign(post, updateData);
            return post;
      }

      delete (id: number, userId: number): void {
            const postIndex = this.posts.findIndex((post) => post.id === id);
            if (postIndex === -1) {
                  throw new NotFoundException('Post not found');
            }

            if (this.posts[postIndex].authorId !== userId) {
                  throw new NotFoundException('You are not authorized to delete this post');
            }

            this.posts.splice(postIndex, 1);
      }

}
