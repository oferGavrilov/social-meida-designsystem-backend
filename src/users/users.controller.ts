/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpStatus, Res, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
      constructor(
            private usersService: UsersService,
            private authService: AuthService,
      ) { }

      @Post('signup')
      async signup (@Body() body: { username: string; password: string }, @Res() res: Response) {

            if (!body.username || !body.password) {
                  throw new UnauthorizedException('Invalid credentials');
            }

            const user = await this.usersService.create(body.username, body.password);
            res.status(HttpStatus.CREATED).json(user);
      }

      @Post('login')
      async login (@Body() body: { username: string; password: string }, @Res() res: Response) {

            if (!body.username || !body.password) {
                  throw new UnauthorizedException('Invalid credentials');
            }
            
            const user = await this.authService.validateUser(body.username, body.password);
            if (!user) {
                  throw new UnauthorizedException('Invalid credentials');
            }
            const token = await this.authService.login(user);
            res.status(HttpStatus.OK).json(token);
      }
}
