import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataSidebar } from './metadata-sidebar';

describe('MetadataSidebar', () => {
  let component: MetadataSidebar;
  let fixture: ComponentFixture<MetadataSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetadataSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
