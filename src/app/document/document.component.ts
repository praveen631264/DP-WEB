import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../models/document.model';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.html',
  styleUrls: ['./document.css'],
  imports: [CommonModule, RouterLink, ChatComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private documentService = inject(DocumentService);

  document = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.documentService.getDocument(id!);
      })
    )
  );

  deleteDocument(doc: Document) {
    if (confirm(`Are you sure you want to delete ${doc.title}?`)) {
      this.documentService.deleteDocument(doc);
      this.router.navigate(['/documents']);
    }
  }
}
