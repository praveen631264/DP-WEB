import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {

  constructor() { }

  sendMessage(message: string) {
    const response = `You said: "${message}". I am a mock AI assistant.`;
    return of(response).pipe(delay(500));
  }
}
