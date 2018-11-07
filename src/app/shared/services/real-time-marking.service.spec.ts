import {TestBed} from '@angular/core/testing';

import {RealTimeMarkingService} from './real-time-marking.service';

describe('RealTimeMarkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealTimeMarkingService = TestBed.get(RealTimeMarkingService);
    expect(service).toBeTruthy();
  });
});
