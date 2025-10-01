import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Kvp } from '../kvp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kvp-editor',
  imports: [CommonModule],
  templateUrl: './kvp-editor.component.html',
  styleUrls: ['./kvp-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KvpEditorComponent {
  kvps = input.required<Kvp[]>();
  deleteKvp = output<Kvp>();
  updateKvp = output<{ oldKvp: Kvp, newKvp: Kvp }>();

  editingKvp = signal<Kvp | null>(null);
  editedKey = signal('');
  editedValue = signal('');

  onDelete(kvp: Kvp) {
    this.deleteKvp.emit(kvp);
  }

  onEdit(kvp: Kvp) {
    this.editingKvp.set(kvp);
    this.editedKey.set(kvp.key);
    this.editedValue.set(kvp.value);
  }

  onSave(oldKvp: Kvp) {
    const newKvp = { key: this.editedKey(), value: this.editedValue() };
    this.updateKvp.emit({ oldKvp, newKvp });
    this.editingKvp.set(null);
  }

  onCancel() {
    this.editingKvp.set(null);
  }
}
