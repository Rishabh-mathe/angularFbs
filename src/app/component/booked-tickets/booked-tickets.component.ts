import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookTicketSrvService } from 'src/app/services/book-ticket-srv.service';
import { StateserviceService } from 'src/app/services/stateservice.service';

@Component({
  selector: 'app-booked-tickets',
  templateUrl: './booked-tickets.component.html',
  styleUrls: ['./booked-tickets.component.css']
})
export class BookedTicketsComponent implements OnInit {

  bookedTickets:any;
  displayedColumns: string[];
  dataSource: any;
  constructor(private router: Router,private stateService: StateserviceService, private service:BookTicketSrvService) { }

  ngOnInit() {
    const observable = this.service.getBookedTickets();
    
    observable.subscribe((res)=>{
      this.bookedTickets = res;
      this.displayedColumns = ["flightId", "dateOfJourney", "bookingClass", "totTickets"];
      this.dataSource = this.bookedTickets;
    })
  }

  editRow(data:any){
    this.stateService.ticketData = data.id
    // this.stateService.data = "Hello Check pass";
    this.router.navigate(["/book-flight"])
    console.log(data)
  }
}
