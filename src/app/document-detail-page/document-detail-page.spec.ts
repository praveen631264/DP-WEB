import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailPage } from './document-detail-page';

describe('DocumentDetailPage', () => {
  let component: DocumentDetailPage;
  let fixture: ComponentFixture<DocumentDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
