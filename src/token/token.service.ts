/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
      private readonly JWT_SECRET_KEY = 'secret123';

      generateToken (payload: any): string {
            return jwt.sign(payload, this.JWT_SECRET_KEY, { expiresIn: '1h' });
      }

      validateToken (token: string) : any {
            try {
                  return jwt.verify(token, this.JWT_SECRET_KEY);
            } catch (error) {
                  return null;
            }
      }
}
