import { Injectable, computed, inject } from '@angular/core';
import { Document, DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private documentService = inject(DocumentService);

  public categories = computed(() => {
    const docs = this.documentService.getDocuments()();
    const categories = docs.map((doc: Document) => doc.category);
    return ['All', ...new Set(categories)];
  });

  getCategories() {
    return this.categories;
  }
}
