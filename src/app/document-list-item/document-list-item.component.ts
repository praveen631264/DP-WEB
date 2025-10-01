import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Document } from '../document.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-document-list-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './document-list-item.component.html',
  styleUrls: ['./document-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListItem {
  document = input.required<Document>();
}
