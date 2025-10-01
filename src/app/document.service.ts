import { Injectable, signal } from '@angular/core';
import { Document } from './models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents = signal<Document[]>([
    { 
      id: '1', 
      filename: 'My First Document', 
      content: 'This is the content of my first document.', 
      category: 'Personal', 
      lastModified: new Date(),
      metadata: { 
        uploaded_at: new Date().toISOString(),
        processing_status: 'Complete',
        kvp: [{ key: 'Author', value: 'John Doe' }, { key: 'Status', value: 'Draft' }]
      }
    },
    { 
      id: '2', 
      filename: 'Work Notes', 
      content: 'These are my work notes.', 
      category: 'Work', 
      lastModified: new Date(),
      metadata: { 
        uploaded_at: new Date().toISOString(),
        processing_status: 'In Progress',
        kvp: [{ key: 'Project', value: 'Apollo' }]
      }
    },
    { 
      id: '3', 
      filename: 'Vacation Plans', 
      content: 'Here are my vacation plans.', 
      category: 'Travel', 
      lastModified: new Date(),
      metadata: { 
        uploaded_at: new Date().toISOString(),
        processing_status: 'Complete',
        kvp: []
      }
    },
  ]);
  private trashedDocuments = signal<Document[]>([]);

  getDocuments(category?: string) {
    if (category) {
      return this.documents().filter(doc => doc.category === category);
    }
    return this.documents();
  }

  getDocument(id: string): Document | undefined {
    return this.documents().find(doc => doc.id === id);
  }

  addDocument(doc: Document) {
    this.documents.set([...this.documents(), doc]);
  }

  updateDocument(updatedDoc: Document) {
    const index = this.documents().findIndex(doc => doc.id === updatedDoc.id);
    if (index !== -1) {
      const newDocs = [...this.documents()];
      newDocs[index] = updatedDoc;
      this.documents.set(newDocs);
    }
  }

  deleteDocument(id: string) {
    const doc = this.documents().find(d => d.id === id);
    if (doc) {
      this.documents.set(this.documents().filter(d => d.id !== id));
      this.trashedDocuments.set([...this.trashedDocuments(), doc]);
    }
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
    this.trashedDocuments.set(this.trashedDocuments().filter(doc => doc.id !== id));
  }
}
