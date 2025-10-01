import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DocumentService, Document } from '../document.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document',
  imports: [CommonModule],
  templateUrl: './document.html',
  styleUrls: ['./document.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent {
  doc = input<Document>();
  private documentService = inject(DocumentService);

  constructor() {}
}
