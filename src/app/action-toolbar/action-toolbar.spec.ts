import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionToolbar } from './action-toolbar';

describe('ActionToolbar', () => {
  let component: ActionToolbar;
  let fixture: ComponentFixture<ActionToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionToolbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
