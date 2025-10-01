import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../models/document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-detail',
  imports: [CommonModule],
  templateUrl: './document-detail.html',
  styleUrls: ['./document-detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailComponent {
  private route = inject(ActivatedRoute);
  private documentService = inject(DocumentService);
  
  document: Document | undefined;

  constructor() {
    const documentId = this.route.snapshot.paramMap.get('id');
    if (documentId) {
      this.document = this.documentService.getDocument(documentId);
    }
  }
}
