import { TestBed } from '@angular/core/testing';

import { KioskTimeout } from './kiosk-timeout';

describe('KioskTimeout', () => {
  let service: KioskTimeout;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KioskTimeout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
