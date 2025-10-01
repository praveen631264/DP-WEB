import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, ChatMessage } from '../chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  docId = this.route.snapshot.paramMap.get('doc_id') || '';

  messages = signal<ChatMessage[]>([]);
  smartReplies = signal<string[]>([]);

  constructor() {
    this.getSmartReplies();
  }

  sendMessage(query: string) {
    if (!query) return;

    const userMessage: ChatMessage = { role: 'user', content: query };
    this.messages.update(messages => [...messages, userMessage]);

    this.chatService.sendMessage(this.docId, query).subscribe(response => {
      const aiMessage: ChatMessage = { role: 'ai', content: response.answer };
      this.messages.update(messages => [...messages, aiMessage]);
      this.getSmartReplies();
    });
  }

  getSmartReplies() {
    this.chatService.getSmartReplies(this.messages()).subscribe(response => {
      this.smartReplies.set(response.replies);
    });
  }
}
