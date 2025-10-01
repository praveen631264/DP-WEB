import { TestBed } from '@angular/core/testing';

import { Kvp } from './kvp';

describe('Kvp', () => {
  let service: Kvp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kvp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
