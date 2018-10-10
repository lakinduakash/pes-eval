import {TestBed} from '@angular/core/testing';

import {NavBarTitleService} from './nav-bar-title.service';

describe('NavBarTitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavBarTitleService = TestBed.get(NavBarTitleService);
    expect(service).toBeTruthy();
  });
});
