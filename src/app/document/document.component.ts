import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.html',
  styleUrls: ['./document.css'],
  imports: [CommonModule, RouterLink, ChatComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private documentService = inject(DocumentService);

  private docId = computed(() => this.route.snapshot.paramMap.get('id'));
  doc = computed(() => {
    const id = this.docId();
    if (id) {
      return this.documentService.getDocument(id);
    }
    return null;
  });

  deleteDocument(doc: Document) {
    if (confirm(`Are you sure you want to delete ${doc.title}?`)) {
      this.documentService.deleteDocument(doc.id);
      this.router.navigate(['/documents']);
    }
  }
}
