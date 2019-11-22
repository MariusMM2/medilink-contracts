import { TestBed } from '@angular/core/testing';

import { ContractApiService } from './contract-api.service';

describe('ContractApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractApiService = TestBed.get(ContractApiService);
    expect(service).toBeTruthy();
  });
});
