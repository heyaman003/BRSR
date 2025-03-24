import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from '../user/user.dtos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ userdetails: GetUserDto; accessToken: string }> {
    try {

      const userdetails: User = await this.userService.getUserdetails(email);

      if (!(await this.isValidPassword(password, userdetails.password)))
        throw new UnauthorizedException('Invalid password.');

      // Getting DTO from userdetails
      const user: GetUserDto = this.userService.convertToDto(userdetails);

      // Generating jwt
      const accessToken: string = await this.generateJWT(userdetails);

      return { userdetails: user, accessToken };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async generateJWT(user: User): Promise<string> {
    try {
      return await this.jwtService.signAsync({
        sub: user['id'],
        role: user.role,
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  private async isValidPassword(
    rawPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    try {
      return await compare(rawPassword, encryptedPassword);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }


  async getUserdetails(userId: string):Promise<GetUserDto> {
    const userdetails: GetUserDto = await this.userService.getUser(userId);
    return userdetails;
  }
}
