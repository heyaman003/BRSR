import {
  ConsoleLogger,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddCommentDTO } from './comment.dtos';
import { DbService } from 'src/utils/db.connections';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentRepository {
  constructor(private readonly db: DbService, private readonly logger:ConsoleLogger) {}

  async addComment(
    commentData: AddCommentDTO,
    userId: string,
  ) {
    try {
      return await this.db.comment.create({
        data: {
          data: commentData.data,
          questionId: commentData.questionId,
          userId,
          mentions:{
            create: commentData.mentions.map((userId)=>({
              user:{
                connect:{
                  id: userId
                }
              },
            })),
          }
        },
        include: {
          mentions: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
      });
    } catch (e) {
      if (!(e instanceof HttpException)) this.logger.log(e.message);
      throw new InternalServerErrorException(e);
    }
  }

  async listAllComents(questionId: string): Promise<Comment[]> {
    try {
      const question = await this.db.question.findUnique({
        where: {
          id: questionId
        },
        include: {
          comments: {
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
        },
      });

      if (!question) throw new NotFoundException('Question does not exist.');

      return question.comments;
    } catch (e) {
      if (!(e instanceof HttpException)) this.logger.log(e.message);
      throw new InternalServerErrorException(e);
    }
  }
}
