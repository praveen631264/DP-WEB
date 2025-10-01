
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface SmartRepliesResponse {
  replies: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);

  sendMessage(docId: string, query: string): Observable<{ answer: string }> {
    return this.http.post<{ answer: string }>('/api/v1/chat', { doc_id: docId, query });
  }

  getSmartReplies(conversation_history: ChatMessage[]): Observable<SmartRepliesResponse> {
    return this.http.post<SmartRepliesResponse>('/api/v1/chat/smart-replies', { conversation_history });
  }
}
