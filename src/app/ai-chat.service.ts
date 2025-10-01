
import { Injectable, signal } from '@angular/core';
import { of, delay, Observable } from 'rxjs';

export interface ChatMessage {
  author: 'user' | 'ai';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  private readonly messages = signal<ChatMessage[]>([]);

  public getMessages() {
    return this.messages.asReadonly();
  }

  public sendMessage(text: string): Observable<string> {
    this.messages.update(messages => [...messages, { author: 'user', text }]);

    // Mock AI response
    const aiResponse = 'This is a mock AI response.';
    setTimeout(() => {
        this.messages.update(messages => [...messages, { author: 'ai', text: aiResponse }]);
    }, 1000)


    return of(aiResponse).pipe(delay(1000));
  }
}
