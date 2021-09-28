import { TestBed } from '@angular/core/testing';

import { AddAirlineServiceService } from './add-airline-service.service';

describe('AddAirlineServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAirlineServiceService = TestBed.get(AddAirlineServiceService);
    expect(service).toBeTruthy();
  });
});
