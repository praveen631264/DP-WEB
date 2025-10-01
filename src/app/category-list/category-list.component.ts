import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  public categories = signal([
    { name: 'Work' },
    { name: 'Personal' },
    { name: 'Invoices' },
    { name: 'Receipts' },
  ]);
}
