import { TestBed } from '@angular/core/testing';

import { StateserviceService } from './stateservice.service';

describe('StateserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateserviceService = TestBed.get(StateserviceService);
    expect(service).toBeTruthy();
  });
});
