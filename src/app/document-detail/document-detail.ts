
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DocumentDetailStateService } from '../document-detail-state.service';
import { DocumentViewer } from '../document-viewer/document-viewer';
import { KvpEditorComponent } from '../kvp-editor/kvp-editor.component';
import { ChatComponent } from '../chat/chat.component';
import { Document } from '../document.service';
import { KeyValuePair } from '../kvp.service';

@Component({
  selector: 'app-document-detail',
  imports: [DocumentViewer, KvpEditorComponent, ChatComponent],
  templateUrl: './document-detail.html',
  styleUrls: ['./document-detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetail {
  document = input.required<Document>();
  extract = output<string>();
  private state = inject(DocumentDetailStateService);
  kvps = this.state.kvps;
  chatHistory = this.state.chatHistory;

  createKvp(kvp: KeyValuePair) {
    this.state.createKvp(kvp);
  }

  updateKvp(kvp: KeyValuePair) {
    this.state.updateKvp(kvp);
  }

  deleteKvp(kvp: KeyValuePair) {
    this.state.deleteKvp(kvp);
  }

  sendMessage(message: string) {
    this.state.sendMessage(message);
  }

  extractKvps(prompt: string) {
    this.extract.emit(prompt);
  }
}
