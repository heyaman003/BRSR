import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './utils/auth/auth.guard';
import { SectionModule } from './modules/section/section.module';
import { ChatController } from './modules/chat/chat.controller';
import { ChatService } from './modules/chat/chat.service';
import { ChatModule } from './modules/chat/chat.module';
import { CommentModule } from './modules/question-comments/comment.module';
import { MyLogger } from './utils/logger';
import { NotificationModule } from './modules/notification/notification.module';
import { ConflictResolutionModule } from './modules/conflict-resolution/conflict.resolution.module';

@Module({
  imports: [
    MyLogger,
    ConfigModule.forRoot(),
    CompanyModule,
    UserModule,
    AuthModule,
    SectionModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60m',
      },
    }),
    ChatModule,
    CommentModule,
    NotificationModule,
    ConflictResolutionModule,
  ],
  controllers: [AppController, ChatController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    ChatService,
  ],
})
export class AppModule {}
