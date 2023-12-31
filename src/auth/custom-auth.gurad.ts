/* eslint-disable prettier/prettier */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { TokenService } from '../token/token.service';

@Injectable()
export class CustomAuthGuard implements CanActivate {
      constructor(private tokenService: TokenService) { }

      canActivate (context: ExecutionContext): boolean {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(' ')[1];

            const decoded = this.tokenService.validateToken(token);

            if (!token) {
                  throw new UnauthorizedException('Authentication token is missing');
                }

            if (!decoded) {
                  throw new UnauthorizedException('Invalid authentication token');
            }

            request.user = decoded;
            return true;
      }
}