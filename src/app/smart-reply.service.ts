import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmartReplyService {

  constructor() { }

  getReplies(message: string): string[] {
    // In a real application, you would use a natural language processing
    // library to generate smart replies. For now, we'll just
    // return a mock response based on the AI's message.

    if (message.includes('extracted the following')) {
      return ['Thanks!', 'Can you show me everything?', 'Perfect.'];
    } else if (message.includes('How can I help you')) {
      return ['Extract all key-value pairs.', 'What is the invoice number?', 'What is the amount due?'];
    } else {
      return [];
    }
  }
}
