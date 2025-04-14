import { Controller, Get, Param, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Sse('/mentions/:userId')
  addClient(@Param('userId') userId: string): Observable<any> {
    return this.notificationService.addClient(userId);
  }

  @Get('/mentions/:userId/close')
  closeNotification(@Param('userId') userId: string) {
    this.notificationService.removeClient(userId);
  }
}
