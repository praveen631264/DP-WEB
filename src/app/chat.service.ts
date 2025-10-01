
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from './chat.model';

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

  getChatHistory(docId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`/api/v1/chat/${docId}`);
  }

  getSmartReplies(conversation_history: ChatMessage[]): Observable<SmartRepliesResponse> {
    return this.http.post<SmartRepliesResponse>('/api/v1/chat/smart-replies', { conversation_history });
  }
}
