import { TestBed } from '@angular/core/testing';

import { LuchtKwaliteitApiService } from './lucht-kwaliteit-api.service';

describe('LuchtKwaliteitApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LuchtKwaliteitApiService = TestBed.get(LuchtKwaliteitApiService);
    expect(service).toBeTruthy();
  });
});
