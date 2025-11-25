import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }
  @Post('openai')
  async fromOpenAI(@Body() body: { question: string }) {
    return this.chatService.answerFromOpenAI(body.question);
  }
}
