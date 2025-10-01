import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrashComponent {
  private documentService = inject(DocumentService);
  trashedDocuments = this.documentService.getTrashedDocuments();

  restoreDocument(id: string) {
    this.documentService.restoreDocument(id);
    this.trashedDocuments = this.documentService.getTrashedDocuments();
  }

  permanentlyDeleteDocument(id: string) {
    this.documentService.permanentlyDeleteDocument(id);
    this.trashedDocuments = this.documentService.getTrashedDocuments();
  }
}
