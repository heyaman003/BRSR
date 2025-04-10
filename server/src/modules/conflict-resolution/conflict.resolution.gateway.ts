import { ConsoleLogger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Subsection, Table } from "@prisma/client";
import { Server, Socket } from "socket.io";


@WebSocketGateway(8001, {namespace: 'conflict-resolution', cors: {
    origin: ['http://localhost:5173'],
    credentials: true
}})
export default class ConflictResolutionGateway {
    @WebSocketServer()
    server: Server
    
    constructor(private logger:ConsoleLogger){}

    @SubscribeMessage('join-room')
    joinRoom(@MessageBody() data:{roomId: string}, @ConnectedSocket() client: Socket) {
        client.join(data.roomId);
    }

    broadcastTableChange(companyId: string, tabledata: Table, userId: string) {
        this.server.to(companyId).emit('table-change', {doneBy: userId, table: tabledata});
    }

    broadcastSubsectionChange(companyId: string, subsection: Subsection) {
        this.server.to(companyId).emit('subsection-change', subsection);
    }
}
