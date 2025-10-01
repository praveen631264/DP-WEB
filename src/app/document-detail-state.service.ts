
import { Injectable, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { Document, DocumentService } from './document.service';
import { KeyValuePair, KvpService } from './kvp.service';
import { ChatMessage } from './chat.model';
import { ChatService } from './chat.service';

interface DocumentDetailState {
  document: Document | null;
  kvps: KeyValuePair[];
  chatHistory: ChatMessage[];
}

@Injectable({
  providedIn: 'root'
})
export class DocumentDetailStateService {
  private documentService = inject(DocumentService);
  private kvpService = inject(KvpService);
  private chatService = inject(ChatService);
  private route = inject(ActivatedRoute);

  private state = signal<DocumentDetailState>({
    document: null,
    kvps: [],
    chatHistory: [],
  });

  document = computed(() => this.state().document);
  kvps = computed(() => this.state().kvps);
  chatHistory = computed(() => this.state().chatHistory);

  constructor() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const docId = params.get('doc_id');
        if (docId) {
          return this.loadDocument(docId);
        } else {
          return EMPTY;
        }
      })
    ).subscribe();
  }

  loadDocument(docId: string): Observable<Document> {
    return this.documentService.getDocument(docId).pipe(
      tap(document => {
        this.state.update(state => ({ ...state, document }));
        this.loadKvps(docId);
        this.loadChatHistory(docId);
      })
    );
  }

  loadKvps(docId: string) {
    this.kvpService.getKvps(docId).subscribe(kvps => {
      this.state.update(state => ({ ...state, kvps }));
    });
  }

  loadChatHistory(docId: string) {
    this.chatService.getChatHistory(docId).subscribe(chatHistory => {
      this.state.update(state => ({ ...state, chatHistory }));
    });
  }

  updateKvp(kvp: KeyValuePair) {
    this.kvpService.updateKvp(kvp).subscribe(() => {
      this.loadKvps(this.document()!.id);
    });
  }

  createKvp(kvp: KeyValuePair) {
    const docId = this.document()!.id;
    this.kvpService.createKvp(docId, kvp).subscribe(() => {
      this.loadKvps(docId);
    });
  }

  deleteKvp(kvp: KeyValuePair) {
    const docId = this.document()!.id;
    this.kvpService.deleteKvp(docId, kvp.id).subscribe(() => {
      this.loadKvps(docId);
    });
  }

  getKvp(id: string): KeyValuePair | undefined {
    return this.kvps().find(kvp => kvp.id === id);
  }

  sendMessage(message: string) {
    const docId = this.document()!.id;
    const userMessage: ChatMessage = { role: 'user', content: message };
    this.state.update(state => ({ ...state, chatHistory: [...state.chatHistory, userMessage]}));
    
    this.chatService.sendMessage(docId, message).subscribe(response => {
      const aiMessage: ChatMessage = { role: 'ai', content: response.answer };
      this.state.update(state => ({ ...state, chatHistory: [...state.chatHistory, aiMessage]}));
    });
  }

  extractKvps(prompt: string) {
    const docContent = this.document()?.content ?? '';
    this.kvpService.extractKvps(docContent, prompt).subscribe(kvps => {
      this.state.update(state => ({ ...state, kvps: [...state.kvps, ...kvps] }));
    });
  }
}
