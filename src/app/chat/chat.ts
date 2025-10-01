
import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../ai-chat';
import { ChatHistory } from '../chat-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule]
})
export class ChatComponent {
  private aiChatService = inject(AiChatService);
  chatHistory = signal<ChatHistory>({ messages: [] });
  userInput = signal('');

  sendMessage() {
    const message = this.userInput();
    if (message.trim()) {
      this.chatHistory.update(history => ({
        ...history,
        messages: [...history.messages, { author: 'user', text: message }]
      }));

      this.aiChatService.sendMessage(message).subscribe((response: string) => {
        this.chatHistory.update(history => ({
          ...history,
          messages: [...history.messages, { author: 'ai', text: response }]
        }));
      });

      this.userInput.set('');
    }
  }
}
