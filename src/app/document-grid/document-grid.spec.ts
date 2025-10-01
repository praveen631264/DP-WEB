import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGrid } from './document-grid';

describe('DocumentGrid', () => {
  let component: DocumentGrid;
  let fixture: ComponentFixture<DocumentGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
