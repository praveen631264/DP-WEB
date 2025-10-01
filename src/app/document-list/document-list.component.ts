import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { DocumentService, Document } from '../document.service';
import { DocumentListItem } from '../document-list-item/document-list-item.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryFilterComponent } from '../category-filter/category-filter';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-document-list',
  imports: [DocumentListItem, CommonModule, RouterModule, CategoryFilterComponent],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListComponent {
  categoryId = input<string>();
  searchTerm = signal<string>('');
  selectedCategory = signal<string | null>(null);
  search = output<string>();

  private documentService = inject(DocumentService);
  private categoryService = inject(CategoryService);

  private allDocuments = this.documentService.getDocuments()();
  categories = this.categoryService.getCategories();

  filteredDocuments = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    let docs = this.allDocuments;

    if (category && category !== 'All') {
      docs = docs.filter((doc: Document) => doc.category === category);
    }

    return docs.filter((doc: Document) => 
      doc.title.toLowerCase().includes(term) || 
      doc.content.toLowerCase().includes(term)
    );
  });


  constructor() {
    const categoryId = this.categoryId();
    if (categoryId) {
      this.selectedCategory.set(categoryId);
    }
  }

  getIcon(docType: Document['type']): string {
    const icons: Record<Document['type'], string> = {
      DOC: '📄',
      PDF: '📝',
      IMG: '🖼️',
    };
    return icons[docType] || '📄';
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
    this.search.emit(term);
  }

  onCategorySelected(category: string) {
    this.selectedCategory.set(category);
  }
}
