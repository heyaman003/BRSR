import { ConsoleLogger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Table } from '@prisma/client';
import { Server, Socket } from 'socket.io';

// Websocket listens to 8001 port
@WebSocketGateway(parseInt(process.env.WS_PORT || '8010'), {
  namespace: 'conflict-resolution',
  path: process.env.WS_PATH,
  ...(process.env.PROFILE === 'dev' && {
    cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
    },
  }),
})
export default class ConflictResolutionGateway {
  @WebSocketServer()
  server: Server;

  constructor(private logger: ConsoleLogger) {}

  @SubscribeMessage('join-room')
  joinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
  }

  broadcastTableChange(companyId: string, tabledata: Table, userId: string) {
    this.server
      .to(companyId)
      .emit('table-change', { doneBy: userId, table: tabledata });
  }

  broadcastTextChange(
    companyId: string,
    questionId: string,
    data: string,
    userId: string,
  ) {
    this.server
      .to(companyId)
      .emit('text-change', { doneBy: userId, data, questionId });
  }
}
