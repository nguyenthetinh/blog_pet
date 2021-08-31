import { AuthService } from "src/auth/auth.service";
import { Socket } from "socket.io";
import { parse } from 'cookie';
import { WsException } from "@nestjs/websockets";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";

export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Message)
    private readonly messageRep: Repository<Message>
  ){}

  async getUserFromSocket(socket: Socket){
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken} = parse(cookie)
    const user = await this.authService.getUserFromAuthenticationToken(authenticationToken)
    if (!user) {
      throw new WsException('Invalid credentials.')
    }
    return user;
  }

  async saveMessage(content: string, author: User){
    const newMessage = await this.messageRep.create({content, author})
    await this.messageRep.save(newMessage)
    return newMessage
  }

  async getAllMessage(){
    return this.messageRep.find({relations:['author']})
  }
}