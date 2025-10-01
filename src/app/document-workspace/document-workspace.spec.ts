import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentWorkspace } from './document-workspace';

describe('DocumentWorkspace', () => {
  let component: DocumentWorkspace;
  let fixture: ComponentFixture<DocumentWorkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentWorkspace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentWorkspace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
