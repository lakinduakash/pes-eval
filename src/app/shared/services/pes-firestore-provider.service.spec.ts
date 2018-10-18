import {TestBed} from '@angular/core/testing';

import {PesFireStoreProviderService} from './pes-firestore-provider.service';

describe('PesFirestoreProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PesFireStoreProviderService = TestBed.get(PesFireStoreProviderService);
    expect(service).toBeTruthy();
  });
});
