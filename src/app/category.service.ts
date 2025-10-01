import { Injectable, signal } from '@angular/core';

export interface Category {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories = signal<Category[]>([
    { id: '1', name: 'Personal' },
    { id: '2', name: 'Work' },
    { id: '3', name: 'Travel' }
  ]);

  getCategories() {
    return this.categories();
  }
}
