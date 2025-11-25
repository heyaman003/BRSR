import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRole } from 'src/modules/user/user.dtos';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    // Getting the http request object
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('Please login.');
    }
    try {
      // Verifying the jwt
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Checking if the user has the required role
      const role: UserRole =
        this.reflector.get<UserRole>('role', context.getHandler()) || 'CLIENT';

      if (this.getPriority(payload.role) < this.getPriority(role))
        throw new UnauthorizedException(
          'You are not authorized to perform this action.',
        );

      // Attaching user details to the request
      request['user'] = payload;
    } catch (e) {
      if (e instanceof HttpException) throw e;
      throw new UnauthorizedException('Please login.');
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const [type, token] = request.cookies.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  getPriority(role: UserRole): number {
    if (role === 'SUPERADMIN') return 2;
    else if (role === 'ADMIN') return 1;
    else return 0;
  }
}
