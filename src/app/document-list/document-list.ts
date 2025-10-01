import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService, Document } from '../document.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-document-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListComponent {
  private documentService = inject(DocumentService);
  private route = inject(ActivatedRoute);

  private queryParams = toSignal(this.route.queryParams);

  private allDocuments = this.documentService.getDocuments();

  filteredDocuments = computed(() => {
    const category = this.queryParams()?.['category'];
    if (category) {
      return this.allDocuments().filter(doc => doc.category === category);
    }
    return this.allDocuments();
  });

  getIcon(docType: Document['type']) {
    switch (docType) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
    }
  }
}
