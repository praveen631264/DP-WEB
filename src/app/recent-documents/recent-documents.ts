import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../models/document.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recent-documents',
  imports: [CommonModule, RouterModule],
  templateUrl: './recent-documents.html',
  styleUrl: './recent-documents.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentDocuments {
  private documentService = inject(DocumentService);
  recentDocuments$: Observable<Document[]> = this.documentService.getDocuments();
}
