import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService
  ){}

  async handleConnection(socket: Socket){
    await this.chatService.getUserFromSocket(socket)
  }

  @SubscribeMessage('send_message')
  async listenForMessages(@MessageBody() content: string, @ConnectedSocket() socket: Socket){
    const author = await this.chatService.getUserFromSocket(socket)
    const messages = await this.chatService.saveMessage(content, author)
    this.server.sockets.emit('receive_message', messages)
  }

  @SubscribeMessage('request_all_messages')
  async requestAllMessages(
    @ConnectedSocket() socket: Socket,
  ) {
    await this.chatService.getUserFromSocket(socket);
    const messages = await this.chatService.getAllMessage();
 
    socket.emit('send_all_messages', messages);
  }
}