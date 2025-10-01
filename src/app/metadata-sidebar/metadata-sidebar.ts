import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../models/document.model';
import { CommonModule, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-metadata-sidebar',
  imports: [CommonModule, KeyValuePipe],
  templateUrl: './metadata-sidebar.html',
  styleUrls: ['./metadata-sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataSidebarComponent {
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
