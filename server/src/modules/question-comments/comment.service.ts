import { ConsoleLogger, Injectable } from '@nestjs/common';
import { AddCommentDTO,AssignUserToQuestionDTO } from './comment.dtos';
import { CommentRepository } from './comment.repository';
import { Comment } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly logger: ConsoleLogger
  ) {}

  async addComment(commentData: AddCommentDTO, userId: string) {
    const comment = await this.commentRepository.addComment(
      commentData,
      userId,
    );

    await Promise.all(comment.mentions.map(async (mention) => {
        this.logger.log(mention, "the mention is--")
        const mentionDetails = await this.userService.getMentionDetails(mention.id);
        this.logger.log(mentionDetails, "the mention details are--")
        this.notificationService.sendNotification(mention.userId, mentionDetails)
    }))
    return comment;
  }
  
  async listAllComments(questionId: string): Promise<Comment[]> {
    return await this.commentRepository.listAllComents(questionId);
  }

  async assignUser(data: AssignUserToQuestionDTO,userId: string) {
   try {
        this.logger.log(data, "the data is--")
        this.notificationService.sendNotificationMentions(data.userId,data);
   } catch (error) {
    this.logger.log(error.message);
   }
    
       return await this.commentRepository.assignUser(data);
  }
}
