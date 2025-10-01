
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { KeyValuePair } from '../kvp.service';

@Component({
  selector: 'app-kvp-editor',
  templateUrl: './kvp-editor.component.html',
  styleUrls: ['./kvp-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KvpEditorComponent {
  kvps = input.required<KeyValuePair[]>();
  kvpUpdate = output<KeyValuePair>();
  create = output<KeyValuePair>();
  delete = output<KeyValuePair>();
  extract = output<string>();

  newKvp = signal<KeyValuePair | null>(null);

  createKvp() {
    this.newKvp.set({ id: '', key: '', value: '', isEditing: true });
  }

  saveNewKvp() {
    if (this.newKvp()) {
      this.create.emit(this.newKvp()!);
      this.newKvp.set(null);
    }
  }

  cancelNewKvp() {
    this.newKvp.set(null);
  }

  editKvp(kvp: KeyValuePair) {
    const newKvp = { ...kvp, isEditing: true };
    this.kvpUpdate.emit(newKvp);
  }

  saveKvp(kvp: KeyValuePair) {
    const newKvp = { ...kvp, isEditing: false };
    this.kvpUpdate.emit(newKvp);
  }

  cancelEdit(kvp: KeyValuePair) {
    const newKvp = { ...kvp, isEditing: false };
    this.kvpUpdate.emit(newKvp);
  }

  deleteKvp(kvp: KeyValuePair) {
    this.delete.emit(kvp);
  }

  updateKvpKey(kvp: KeyValuePair, event: Event) {
    const newKvp = { ...kvp, key: (event.target as HTMLInputElement).value };
    this.kvpUpdate.emit(newKvp);
  }

  updateKvpValue(kvp: KeyValuePair, event: Event) {
    const newKvp = { ...kvp, value: (event.target as HTMLInputElement).value };
    this.kvpUpdate.emit(newKvp);
  }

  updateNewKvpKey(event: Event) {
    if (this.newKvp()) {
      this.newKvp.set({ ...this.newKvp()!, key: (event.target as HTMLInputElement).value });
    }
  }

  updateNewKvpValue(event: Event) {
    if (this.newKvp()) {
      this.newKvp.set({ ...this.newKvp()!, value: (event.target as HTMLInputElement).value });
    }
  }
}
