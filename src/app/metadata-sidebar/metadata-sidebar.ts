import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Document } from '../models/document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metadata-sidebar',
  imports: [CommonModule],
  templateUrl: './metadata-sidebar.html',
  styleUrls: ['./metadata-sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataSidebarComponent {
  public document = input<Document | null>();
}
