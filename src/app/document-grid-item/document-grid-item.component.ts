import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Document } from '../document.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-document-grid-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './document-grid-item.component.html',
  styleUrls: ['./document-grid-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentGridItem {
  document = input.required<Document>();
}
