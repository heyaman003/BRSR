import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  imports: [NotificationModule, UserModule],
})
export class CommentModule {}
