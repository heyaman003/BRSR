import { ConsoleLogger, Controller, Get, Param, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly notificationService: NotificationService,
  ) {}

  @Sse('/mentions/:userId')
  sendNotification(@Param('userId') userId: string): Observable<any> {
    this.logger.debug(userId);
    return this.notificationService.addClient(userId);
  }

  @Get('/mentions/:userId/close')
  closeNotification(@Param('userId') userId: string) {
    this.logger.debug(userId);
    this.notificationService.removeClient(userId);
  }
}
