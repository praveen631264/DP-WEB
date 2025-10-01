import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatViewer } from './chat-viewer';

describe('ChatViewer', () => {
  let component: ChatViewer;
  let fixture: ComponentFixture<ChatViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
