import { ConsoleLogger, Injectable } from "@nestjs/common";
import { Subject } from "rxjs";

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
            return this.clients[userId].asObservable();
        } catch (error) {
            this.logger.error('Error adding client:', error);
            throw error;
        }
    }

    sendNotification(userId: string, data: any) {
        try {
            if (this.clients[userId]) {
                this.clients[userId].next(JSON.stringify({data}));
            }
        } catch (error) {
            this.logger.error('Error sending notification:', error);
            throw error;
        }
    }
}