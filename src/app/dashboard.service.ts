import { inject, Injectable, computed } from '@angular/core';
import { DocumentService } from './document.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private documentService = inject(DocumentService);
  private categoryService = inject(CategoryService);

  private documents = this.documentService.getDocuments()();
  private categories = this.categoryService.getCategories();

  public stats = computed(() => ({
    totalDocuments: this.documents.length,
    documentsInTrash: 0, // Placeholder
    categoriesCount: this.categories.length,
    averageProcessingTime: 0, // Placeholder
  }));

  getDashboardStats() {
    return this.stats;
  }
}
