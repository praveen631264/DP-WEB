import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// This interface will be used across the application.
// We'll move it to its own model file later if needed.
export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  isEditing?: boolean; // UI-only state, optional
  // Future state for highlighting
  // location?: { page: number; bbox: [number, number, number, number] };
}

@Injectable({
  providedIn: 'root'
})
export class KvpService {
  private http = inject(HttpClient);

  /**
   * Overwrites the entire set of Key-Value Pairs for a document.
   * This aligns with the Human-in-the-Loop API requirement.
   * @param docId The ID of the document to update.
   * @param kvps The full, new array of Key-Value Pairs.
   * @returns The updated document object from the backend.
   */
  updateAllKvps(docId: string, kvps: KeyValuePair[]): Observable<any> {
    // The backend expects the list of KVPs as the body.
    return this.http.put(`/api/v1/documents/${docId}/kvp`, kvps);
  }

  /**
   * Calls the backend to extract new KVPs from document content based on a prompt.
   * Note: The API for this might change to be part of the chat endpoint.
   * @param docContent The text content of the document.
   * @param prompt The user's prompt for extraction.
   * @returns A list of newly extracted KeyValuePairs.
   */
  extractKvps(docContent: string, prompt: string): Observable<KeyValuePair[]> {
    return this.http.post<KeyValuePair[]>('/api/v1/kvp/extract', { docContent, prompt });
  }
}
