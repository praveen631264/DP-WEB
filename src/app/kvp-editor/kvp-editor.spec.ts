import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpEditor } from './kvp-editor';

describe('KvpEditor', () => {
  let component: KvpEditor;
  let fixture: ComponentFixture<KvpEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KvpEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
