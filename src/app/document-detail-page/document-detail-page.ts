import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { DocumentDetail } from '../document-detail/document-detail';
import { MetadataSidebarComponent } from '../metadata-sidebar/metadata-sidebar';
import { ActionToolbar } from '../action-toolbar/action-toolbar';
import { CommonModule } from '@angular/common';
import { DocumentDetailStateService } from '../document-detail-state.service';

@Component({
  selector: 'app-document-detail-page',
  imports: [CommonModule, DocumentDetail, MetadataSidebarComponent, ActionToolbar],
  templateUrl: './document-detail-page.html',
  styleUrls: ['./document-detail-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailPage {
  private route = inject(ActivatedRoute);
  private documentService = inject(DocumentService);
  private documentDetailState = inject(DocumentDetailStateService);

  private params = toSignal(this.route.paramMap);

  public document = computed(() => {
    const id = this.params()?.get('id');
    if (id) {
      return this.documentService.getDocument(id);
    }
    return null;
  });

  extractKvps(prompt: string) {
    this.documentDetailState.extractKvps(prompt);
  }
}
