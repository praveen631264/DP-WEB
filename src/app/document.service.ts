import { Injectable, signal, computed } from '@angular/core';

export interface Document {
  id: string;
  title: string;
  content: string;
  category: string;
  type: 'DOC' | 'PDF' | 'IMG';
  lastModified: Date;
  kvps?: any[];
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Client Onboarding',
    content: 'Client onboarding process document...',
    category: 'Human Resources',
    type: 'DOC',
    lastModified: new Date('2023-10-26'),
  },
  {
    id: '2',
    title: 'Q3 Financial Report',
    content: 'Financial report for the third quarter...',
    category: 'Finance',
    type: 'PDF',
    lastModified: new Date('2023-10-20'),
  },
  {
    id: '3',
    title: 'API Documentation',
    content: 'Technical documentation for the new API...',
    category: 'Engineering',
    type: 'DOC',
    lastModified: new Date('2023-09-15'),
  },
  {
    id: '4',
    title: 'Marketing Campaign Plan',
    content: 'Plan for the upcoming marketing campaign...',
    category: 'Marketing',
    type: 'DOC',
    lastModified: new Date('2023-10-05'),
  },
  {
    id: '5',
    title: 'Employee Handbook',
    content: 'Handbook for all employees...',
    category: 'Human Resources',
    type: 'PDF',
    lastModified: new Date('2023-08-01'),
  }
];

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents = signal<Document[]>(MOCK_DOCUMENTS);

  getDocuments() {
    return this.documents.asReadonly();
  }

  getDocument(id: string) {
    return computed(() => this.documents().find(doc => doc.id === id));
  }
}
