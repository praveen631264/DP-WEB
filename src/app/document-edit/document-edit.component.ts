import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../models/document.model';
import { CategoryService, Category } from '../category.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentEditComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private documentService = inject(DocumentService);
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  doc: Document | undefined;
  categories: Category[] = [];
  docForm = this.fb.group({
    filename: ['', Validators.required],
    content: [''],
    category: ['', Validators.required]
  });

  constructor() {
    const docId = this.route.snapshot.paramMap.get('id');
    if (docId) {
      this.doc = this.documentService.getDocument(docId);
      if (this.doc) {
        this.docForm.patchValue(this.doc);
      }
    }
    this.categories = this.categoryService.getCategories();
  }

  saveDocument() {
    if (this.docForm.valid) {
      if (this.doc) {
        const updatedDoc: Document = {
          ...this.doc,
          filename: this.docForm.value.filename!,
          content: this.docForm.value.content ?? '',
          category: this.docForm.value.category!,
          lastModified: new Date(),
        };
        this.documentService.updateDocument(updatedDoc);
        this.router.navigate(['/documents', this.doc.id]);
      } else {
        const newDoc: Document = {
          id: Date.now().toString(),
          filename: this.docForm.value.filename!,
          content: this.docForm.value.content ?? '',
          category: this.docForm.value.category!,
          lastModified: new Date(),
          metadata: { 
            uploaded_at: new Date().toISOString(),
            processing_status: 'Complete',
            kvp: [] 
          },
        };
        this.documentService.addDocument(newDoc);
        this.router.navigate(['/documents']);
      }
    }
  }
}
