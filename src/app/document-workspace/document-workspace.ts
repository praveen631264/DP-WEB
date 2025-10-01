import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecentDocuments } from '../recent-documents/recent-documents';
import { DocumentUpload } from '../document-upload/document-upload';
import { DocumentGrid } from '../document-grid/document-grid';

@Component({
  selector: 'app-document-workspace',
  imports: [RecentDocuments, DocumentUpload, DocumentGrid],
  templateUrl: './document-workspace.html',
  styleUrl: './document-workspace.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentWorkspace {

}
