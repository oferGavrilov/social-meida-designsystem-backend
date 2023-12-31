/* eslint-disable prettier/prettier */

import { Controller, Post, Body, UseGuards, Req, UsePipes, ValidationPipe, Get, Param, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { CustomAuthGuard } from 'src/auth/custom-auth.gurad';
import { PostsService } from './posts.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';

@Controller('posts')
@UseGuards(CustomAuthGuard, RolesGuard)
export class PostsController {
      constructor(private readonly postsService: PostsService) { }

      @Post()
      @Roles('admin', 'editor')
      @UsePipes(new ValidationPipe({ transform: true }))
      createPost (@Body() postData: CreatePostDto, @Req() req: any, @Res() res: Response) {
            const newPost = this.postsService.create(postData, req.user.id);
            return res.status(HttpStatus.CREATED).json(newPost);
      }

      @Get()
      getAllPosts (@Res() res: Response): void {
            const posts = this.postsService.getAllPosts();
            res.status(HttpStatus.OK).json(posts);
      }

      @Get(':id')
      getPostById (@Param('id') id: number, @Res() res: Response) {
            const post = this.postsService.getPostById(id);
            res.status(HttpStatus.OK).json(post);
      }

      @Put(':id')
      @Roles('admin', 'editor')
      @UsePipes(new ValidationPipe({ transform: true }))
      updatePost (@Param('id') id: number, @Body() updateData: UpdatePostDto, @Req() req: any, @Res() res: Response) {
            const updatedPost = this.postsService.update(id, req.user.id, updateData);
            res.status(HttpStatus.OK).json(updatedPost);
      }

      @Delete(':id')
      @Roles('admin', 'editor')
      deletePost (@Param('id') id: number, @Req() req: any, @Res() res: Response) {
            this.postsService.delete(id, req.user.id);
            return res.status(HttpStatus.NO_CONTENT).send();
      }
}
