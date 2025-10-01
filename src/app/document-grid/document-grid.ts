import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DocumentService, Document } from '../document.service';
import { DocumentGridItem } from '../document-grid-item/document-grid-item.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-document-grid',
  imports: [DocumentGridItem, CommonModule, RouterModule],
  templateUrl: './document-grid.html',
  styleUrls: ['./document-grid.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentGrid {
  categoryId = input<string>();
  private documentService = inject(DocumentService);
  private allDocuments = this.documentService.getDocuments()();

  documents = computed(() => {
    const categoryId = this.categoryId();
    if (categoryId && categoryId !== 'All') {
      return this.allDocuments.filter((doc: Document) => doc.category === categoryId);
    } else {
      return this.allDocuments;
    }
  });
}
