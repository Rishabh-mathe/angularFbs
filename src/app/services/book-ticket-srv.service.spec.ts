import { TestBed } from '@angular/core/testing';

import { BookTicketSrvService } from './book-ticket-srv.service';

describe('BookTicketSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookTicketSrvService = TestBed.get(BookTicketSrvService);
    expect(service).toBeTruthy();
  });
});
