import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocumentDetailComponent } from '../document-detail/document-detail';
import { MetadataSidebarComponent } from '../metadata-sidebar/metadata-sidebar';
import { ActionToolbar } from '../action-toolbar/action-toolbar';

@Component({
  selector: 'app-document-detail-page',
  imports: [DocumentDetailComponent, MetadataSidebarComponent, ActionToolbar],
  templateUrl: './document-detail-page.html',
  styleUrls: ['./document-detail-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailPage {}
