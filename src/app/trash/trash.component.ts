import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Document } from '../document.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrashComponent {
  trash = signal<Document[]>([
    {
      id: '6',
      title: 'Old Marketing Proposal',
      content: '...',
      category: 'Marketing',
      type: 'DOC',
      lastModified: new Date('2022-01-10'),
    },
    {
      id: '7',
      title: 'Archived Financials',
      content: '...',
      category: 'Finance',
      type: 'PDF',
      lastModified: new Date('2021-05-20'),
    },
  ]);
}
