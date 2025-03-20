import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/user/user.dtos';
import { DbService } from 'src/utils/db.connections';

@Injectable()
export class UserRepository {
  constructor(private db: DbService) {}

  async createUser(userData: CreateUserDto, role: Role): Promise<User> {
    try {
      const user: User = await this.db.user.create({
        data: {
          name: userData.name,
          password: userData.password,
          email: userData.email,
          role: role,
          companyId: userData.company,
        },
      })
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getUserdetails(userId: string): Promise<User | null> {
    try {
      const user: User | null = await this.db.user.findUnique({ where: { id: userId } })
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getUserdetailsByEmail(email: string): Promise<User | null> {
    try {
      const user: User | null = await this.db.user.findUnique({where: { email: email }});
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.db.user.delete({where:{
        id: userId,
        role:{
          not: {
            equals: Role.SUPERADMIN
          }
        }
      }});
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
