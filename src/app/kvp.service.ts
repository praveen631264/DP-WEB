import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  isEditing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class KvpService {
  private http = inject(HttpClient);

  constructor() { }

  getKvps(docId: string): Observable<KeyValuePair[]> {
    // MOCK DATA
    return of([
      { id: '1', key: 'First Name', value: 'John', isEditing: false },
      { id: '2', key: 'Last Name', value: 'Doe', isEditing: false },
      { id: '3', key: 'Email', value: 'john.doe@example.com', isEditing: false },
    ]);
  }

  createKvp(docId: string, kvp: KeyValuePair): Observable<any> {
    return of(null);
  }

  updateKvp(kvp: KeyValuePair): Observable<any> {
    return of(null);
  }

  deleteKvp(docId: string, kvpId: string): Observable<any> {
    return of(null);
  }

  extractKvps(docContent: string, prompt: string): Observable<KeyValuePair[]> {
    return this.http.post<KeyValuePair[]>('/api/v1/kvp/extract', { docContent, prompt });
  }
}
