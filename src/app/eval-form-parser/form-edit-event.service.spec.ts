import {TestBed} from '@angular/core/testing';

import {FormEditEventService} from './form-edit-event.service';

describe('FormEditEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormEditEventService = TestBed.get(FormEditEventService);
    expect(service).toBeTruthy();
  });
});
