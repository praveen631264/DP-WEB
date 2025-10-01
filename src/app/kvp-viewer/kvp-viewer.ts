import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentDetailStateService } from '../document-detail-state.service';
import { KeyValuePair } from '../kvp.service';

@Component({
  selector: 'app-kvp-viewer',
  templateUrl: './kvp-viewer.html',
  styleUrls: ['./kvp-viewer.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KvpViewer {
  private documentDetailState = inject(DocumentDetailStateService);

  kvps = this.documentDetailState.kvps;

  onValueChange(kvp: KeyValuePair, newValue: string) {
    this.documentDetailState.updateKvp({ ...kvp, value: newValue });
  }
}
