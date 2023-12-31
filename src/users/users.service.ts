/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { User as IUser } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
      private users: IUser[] = [];

      async create (username: string, password: string): Promise<IUser> {
            const existingUser = this.users.find(user => user.username === username);
            if (existingUser) {
                  throw new ConflictException('Username already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new IUser();
            user.username = username;
            user.password = hashedPassword;
            this.users.push(user);
            return user;
      }

      async findOne (username: string): Promise<IUser | undefined> {
            return this.users.find(user => user.username === username);
      }
}
