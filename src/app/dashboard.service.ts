import { inject, Injectable, computed } from '@angular/core';
import { DocumentService } from './document.service';
import { CategoryService } from './category.service';
import { map } from 'rxjs/operators';

export interface DashboardStats {
  totalDocuments: number;
  documentsInTrash: number;
  categoriesCount: number;
  averageProcessingTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private documentService = inject(DocumentService);
  private categoryService = inject(CategoryService);

  getDashboardStats() {
    return this.documentService.getDocuments().pipe(
      map(documents => ({
        totalDocuments: documents.length,
        documentsInTrash: this.documentService.getTrashedDocuments().length,
        categoriesCount: this.categoryService.getCategories().length,
        averageProcessingTime: 0, // Placeholder
      }))
    );
  }
}
