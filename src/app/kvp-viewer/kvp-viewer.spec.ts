import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvpViewer } from './kvp-viewer';

describe('KvpViewer', () => {
  let component: KvpViewer;
  let fixture: ComponentFixture<KvpViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvpViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KvpViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
