import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getCategories() {
    return of({ categories: ['Financial', 'Technical', 'General'] });
  }
}
