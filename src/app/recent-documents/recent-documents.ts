import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentService, Document } from '../document.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-documents',
  imports: [CommonModule, RouterModule],
  templateUrl: './recent-documents.html',
  styleUrl: './recent-documents.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentDocuments {
  private documentService = inject(DocumentService);
  recentDocuments: Document[] = this.documentService.getDocuments();
}
