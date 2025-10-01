import { TestBed } from '@angular/core/testing';

import { SmartReply } from './smart-reply';

describe('SmartReply', () => {
  let service: SmartReply;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartReply);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
