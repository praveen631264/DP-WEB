
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ChatMessage } from '../chat.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  chatHistory = input.required<ChatMessage[]>();
  sendMessage = output<string>();
  newMessage = '';

  onSendMessage() {
    if (this.newMessage.trim()) {
      this.sendMessage.emit(this.newMessage.trim());
      this.newMessage = '';
    }
  }
}
