import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DocumentService, Document } from '../document.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-grid', // Updated selector
  imports: [CommonModule, RouterModule],
  templateUrl: './document-grid.html',
  styleUrls: ['./document-grid.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentGrid {
  private route = inject(ActivatedRoute);
  private documentService = inject(DocumentService);
  documents: Document[] = [];

  constructor() {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['category'];
      this.documents = this.documentService.getDocuments(categoryId);
    });
  }
}
