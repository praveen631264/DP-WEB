import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentDetailStateService } from '../document-detail-state.service';
import { ChatComponent } from '../chat/chat';

@Component({
  selector: 'app-document-detail',
  imports: [CommonModule, ChatComponent],
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailComponent {
  state = inject(DocumentDetailStateService);
}
