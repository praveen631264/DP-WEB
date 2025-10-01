import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-action-toolbar',
  templateUrl: './action-toolbar.html',
  styleUrls: ['./action-toolbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionToolbar {
  extract = output<string>();

  onExtract() {
    const prompt = "Extract key-value pairs from the document."; // Replace with a more sophisticated prompt if needed
    this.extract.emit(prompt);
  }
}
