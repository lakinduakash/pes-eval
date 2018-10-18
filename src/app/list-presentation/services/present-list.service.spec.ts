import {TestBed} from '@angular/core/testing';

import {PresentListService} from './present-list.service';

describe('PresentListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentListService = TestBed.get(PresentListService);
    expect(service).toBeTruthy();
  });
});
