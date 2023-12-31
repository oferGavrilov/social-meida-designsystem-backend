/* eslint-disable prettier/prettier */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
      constructor(private reflector: Reflector) { }

      canActivate (context: ExecutionContext): boolean {
            const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

            if (!requiredRoles) {
                  return true;
            }

            const request = context.switchToHttp().getRequest();
            const user = request.user;

            const hasRole = () => user.roles.some((role: string) => requiredRoles.includes(role));

            if (user && user.roles && hasRole()) {
                  return true;
            }

            throw new UnauthorizedException('You are not authorized to access this resource');
      }
}
