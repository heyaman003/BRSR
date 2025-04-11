import {
  BadRequestException,
  ConsoleLogger,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { CreateUserDto, UserRole } from 'src/modules/user/user.dtos';
import { DbService } from 'prisma/db.connections';

@Injectable()
export class UserRepository {
  constructor(
    private readonly db: DbService,
    private readonly logger: ConsoleLogger,
  ) {}

  async doesEmailExist(email: string): Promise<Boolean> {
    try {
      const userId = (await this.db.user.findUnique({
        where: {
          email: email
        },
        select: {
          id: true
        }
      }))?.id;

      return userId?true:false;
    } catch (e) {
      if (!(e instanceof HttpException)) {
        this.logger.error(e.message, e.stack);
        throw new InternalServerErrorException();
      }
      throw e;
    }
  }

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
      });
      return user;
    } catch (e) {
      if (!(e instanceof HttpException)) {
        this.logger.error(e.message, e.stack);
        throw new InternalServerErrorException();
      }
      throw e;
    }
  }

  async getUserdetails(userId: string): Promise<User | null> {
    try {
      const user: User | null = await this.db.user.findUnique({
        where: { id: userId },
      });
      return user;
    } catch (e) {
      if (!(e instanceof HttpException)) {
        this.logger.error(e.message, e.stack);
        throw new InternalServerErrorException();
      }
      throw e;
    }
  }

  async getUserdetailsByEmail(email: string): Promise<User | null> {
    try {
      const user: User | null = await this.db.user.findUnique({
        where: { email: email },
      });
      return user;
    } catch (e) {
      if (!(e instanceof HttpException)) {
        this.logger.error(e.message, e.stack);
        throw new InternalServerErrorException();
      }
      throw e;
    }
  }

  async deleteUser(userId: string, userRole: UserRole): Promise<void> {
    try {
      if (userRole === 'SUPERADMIN')
        await this.db.user.delete({
          where: {
            id: userId,
            role: {
              in: ['ADMIN', 'CLIENT'],
            },
          },
        });
      else if (userRole === 'ADMIN')
        await this.db.user.delete({
          where: {
            id: userId,
            role: {
              in: ['ADMIN'],
            },
          },
        });
    } catch (e) {
      if (!(e instanceof HttpException)) {
        this.logger.error(e.message, e.stack);
        throw new InternalServerErrorException();
      }
      throw e;
    }
  }

  /**
   * Fetches all the mentions involving the given user
   * @param userId 
   */
  async getMentions(userId: string) {
    try {
      return await this.db.user.findUnique({
        where: { id: userId },
        select: {
          mentionedIn: {
            select: {
              id: true,
              comment: {
                select: {
                  createdAt: true,
                  question: {
                    select: {
                      id: true,
                      subsection: {
                        select: {
                          id: true,
                          section: {
                            select: {
                              id: true,
                              companyId: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  user: {
                    select: {
                      id: true,
                      email: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (e) {
      if (!(e instanceof HttpException)) {
        this.logger.error(e.message, e.stack);
        throw new InternalServerErrorException();
      }
      throw e;
    }
  }

  /**
   * Fetches the details of a mention
   * @param mentionId 
   */
  async getMentionDetails(mentionId: string) {
    try {
      return await this.db.mention.findUnique({
        where: { id: mentionId },
        select: {
          id: true,
          comment: {
            select: {
              createdAt: true,
              question: {
                select: {
                  id: true,
                  subsection: {
                    select: {
                      id: true,
                      section: {
                        select: {
                          id: true,
                          companyId: true,
                        },
                      },
                    },
                  },
                },
              },
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    } catch (e) {
      if (!(e instanceof HttpException)) {
        this.logger.error(e.message, e.stack);
        throw new InternalServerErrorException();
      }
      throw e;
    }
  }

  /**
   * Fetches the companyId corresponding to an user 
   * @param userId
   */
  async getCompanyOfUser(userId: string) {
    const user = await this.db.user.findUnique({
      where:{
        id: userId,
      },
      select: {
        companyId: true
      }
    })
    return user?.companyId
  }
}
