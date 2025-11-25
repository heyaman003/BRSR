import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  clients: Subject<any>[];
  constructor(private readonly logger: ConsoleLogger) {
    this.clients = [];
  }

  addClient(userId: string) {
    try {
      if (!this.clients[userId]) {
        this.clients[userId] = new Subject();
      }
      this.logger.log(userId, 'the userId is while iniillazing is');
      return this.clients[userId].asObservable();
    } catch (error) {
      this.logger.error('Error adding client:', error);
      throw error;
    }
  }

  removeClient(userId: string) {
    this.logger.log(userId, 'the userId is while iniillazing is');
    try {
      if (this.clients[userId]) {
        this.clients[userId].complete();
        delete this.clients[userId];
      }
    } catch (error) {
      this.logger.error('Error removing client:', error);
      throw error;
    }
  }

  sendNotification(userId: string, data: any) {
    try {
      if (this.clients[userId]) {
        this.clients[userId].next(JSON.stringify({ data }));
      }
    } catch (error) {
      this.logger.error('Error sending notification:', error);
      throw error;
    }
  }
  sendNotificationMentions(userId: string, data: any) {
    console.log(
      ' sendNotificationMentions is called',
      userId,
      data,
      this.clients,
    );
    try {
      if (this.clients[userId]) {
        this.clients[userId].next(JSON.stringify({ data }));
        this.logger.log('notification sent to mentions', data);
      }
    } catch (error) {
      this.logger.error('Error sending notification:', error);
      throw error;
    }
  }
}
