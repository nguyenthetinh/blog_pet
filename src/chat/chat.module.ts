import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Message])],
  controllers: [],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
