import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Document } from '../document.service';
import { KeyValuePair } from '../kvp.service';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.html',
  styleUrls: ['./document-viewer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewer {
  document = input<Document | null>();
  selectedKvp = input<KeyValuePair | null>();
}
