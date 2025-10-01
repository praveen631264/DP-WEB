import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  imports: [CommonModule],
  templateUrl: './category-filter.html',
  styleUrls: ['./category-filter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFilterComponent {
  categories = input.required<string[]>();
  categorySelected = output<string>();

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }
}
