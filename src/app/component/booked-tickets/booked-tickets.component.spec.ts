import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTicketsComponent } from './booked-tickets.component';

describe('BookedTicketsComponent', () => {
  let component: BookedTicketsComponent;
  let fixture: ComponentFixture<BookedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
