import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Document } from '../models/document.model';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.html',
  styleUrls: ['./document-viewer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewer {
  document = input<Document | null>();
}
