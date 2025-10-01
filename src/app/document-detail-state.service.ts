import { Injectable, computed, inject, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Document, DocumentService } from './document.service';
import { KeyValuePair, KvpService } from './kvp.service';

// Represents the state for the document detail view
interface DocumentDetailState {
  document: Document | null;
  kvps: KeyValuePair[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentDetailStateService {
  // Services
  private documentService = inject(DocumentService);
  private kvpService = inject(KvpService);
  private route = inject(ActivatedRoute);

  // State signal
  private state = signal<DocumentDetailState>({
    document: null,
    kvps: [],
    loading: true,
    error: null,
  });

  // Selectors
  document = computed(() => this.state().document);
  kvps = computed(() => this.state().kvps);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  private paramMap = toSignal(this.route.paramMap);

  constructor() {
    effect(() => {
      const docId = this.paramMap()?.get('doc_id');
      if (docId) {
        const doc = this.documentService.getDocument(docId)();
        if (doc) {
          this.state.update(s => ({
            ...s,
            document: doc,
            kvps: doc.kvps || [],
            loading: false,
          }));
        } else {
          this.state.update(s => ({ ...s, loading: false, error: 'Document not found.' }));
        }
      }
    });
  }

  // --- KVP OPERATIONS (with API alignment) ---

  createKvp(kvp: Partial<KeyValuePair>) {
    const newKvp: KeyValuePair = {
      id: crypto.randomUUID(), // Create a temporary ID for the UI
      key: kvp.key || '',
      value: kvp.value || '',
      isEditing: true, // Start in editing mode
    };

    this.state.update(s => ({ ...s, kvps: [...s.kvps, newKvp] }));
    this.syncKvps();
  }

  updateKvp(updatedKvp: KeyValuePair) {
    const currentKvps = this.state().kvps;
    const newKvps = currentKvps.map(k => k.id === updatedKvp.id ? { ...k, ...updatedKvp, isEditing: false } : k);
    
    this.state.update(s => ({ ...s, kvps: newKvps }));
    this.syncKvps();
  }

  deleteKvp(kvpToDelete: KeyValuePair) {
    const newKvps = this.state().kvps.filter(k => k.id !== kvpToDelete.id);

    this.state.update(s => ({ ...s, kvps: newKvps }));
    this.syncKvps();
  }

  extractKvps(prompt: string) {
    const docContent = this.document()?.content ?? '';
    this.kvpService.extractKvps(docContent, prompt).subscribe(extractedKvps => {
      const newKvps = [...this.state().kvps, ...extractedKvps];
      this.state.update(s => ({ ...s, kvps: newKvps }));
      this.syncKvps();
    });
  }

  /**
   * Private helper to synchronize the entire KVP list with the backend.
   */
  private syncKvps() {
    const doc = this.document();
    if (!doc) return;

    // Strip out the UI-only 'isEditing' property before sending to the backend
    const kvpsToSync = this.state().kvps.map(({ isEditing, ...rest }) => rest);

    this.kvpService.updateAllKvps(doc.id, kvpsToSync).subscribe();
  }
}
