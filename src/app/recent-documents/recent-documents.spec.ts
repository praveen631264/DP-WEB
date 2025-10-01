import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDocuments } from './recent-documents';

describe('RecentDocuments', () => {
  let component: RecentDocuments;
  let fixture: ComponentFixture<RecentDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
