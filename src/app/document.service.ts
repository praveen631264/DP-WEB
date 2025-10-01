import { Injectable, signal } from '@angular/core';
import { Document } from './models/document.model';
import { Observable, of } from 'rxjs';
export type { Document };

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents = signal<Document[]>([]);
  private trashedDocuments = signal<Document[]>([]);

  constructor() {
    // Create mock data
    const mockDocuments: Document[] = [
      {
        id: '1',
        title: 'My First Document',
        filename: 'document1.pdf',
        content: 'This is the content of my first document.',
        category: 'Work',
        lastModified: new Date(),
        metadata: {
          uploaded_at: new Date().toISOString(),
          processing_status: 'Complete'
        }
      },
      {
        id: '2',
        title: 'My Second Document',
        filename: 'document2.docx',
        content: 'This is the content of my second document.',
        category: 'Personal',
        lastModified: new Date(),
        metadata: {
          uploaded_at: new Date().toISOString(),
          processing_status: 'Pending'
        }
      }
    ];

    this.documents.set(mockDocuments);
  }

  getDocuments(categoryId?: string): Observable<Document[]> {
    if (categoryId) {
      return of(this.documents().filter(doc => doc.category === categoryId));
    }
    return of(this.documents());
  }

  getDocument(id: string): Observable<Document> {
    const doc = this.documents().find(doc => doc.id === id);
    return of(doc!);
  }

  addDocument(document: Document) {
    this.documents.set([...this.documents(), document]);
  }

  deleteDocument(document: Document) {
    this.documents.set(this.documents().filter(d => d.id !== document.id));
    this.trashedDocuments.set([...this.trashedDocuments(), document]);
  }

  getTrashedDocuments() {
    return this.trashedDocuments();
  }

  restoreDocument(id: string) {
    const doc = this.trashedDocuments().find(d => d.id === id);
    if (doc) {
      this.trashedDocuments.set(this.trashedDocuments().filter(d => d.id !== id));
      this.documents.set([...this.documents(), doc]);
    }
  }

  permanentlyDeleteDocument(id: string) {
    this.trashedDocuments.set(this.trashedDocuments().filter(d => d.id !== id));
  }
}
