import { ConsoleLogger, Controller, Param, Sse } from "@nestjs/common";
import { Observable } from "rxjs";
import { NotificationService } from "./notification.service";

@Controller('notification')
export class NotificationController {
    constructor(private readonly logger: ConsoleLogger, private readonly notificationService: NotificationService) {}   

  @Sse('/mentions/:userId')
    sendNotification(@Param('userId') userId: string): Observable<any> {
    try {
        this.logger.debug(userId);
        return this.notificationService.addClient(userId);
    } catch (error) {
        this.logger.error('Error sending notification:', error);
        throw error;
    }
  }
}