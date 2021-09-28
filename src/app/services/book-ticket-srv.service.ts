import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder,FormArray, FormGroup,AbstractControl, Validators } from '@angular/forms';
import { BookTicket } from '../dtos/book-ticket';


@Injectable({
  providedIn: 'root'
})
export class BookTicketSrvService {
  getFormData(data: any) {
    const observable = this.httpClient.get("http://localhost:8090/book/"+data,
    
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }
  
  createPassangerFormGroup(): AbstractControl {
    return this.builder.group({
      id:[0],
      passangerName:["",Validators.required],
      passangerAge:["",Validators.required],
      foodType: ["",Validators.required],
      gender:["",Validators.required],
      ticketStatus:["",Validators.required]
    })
  }
  buildTicketForm(): FormGroup {
    return this.builder.group({
      id:null,
      flightId: null,
      dateOfJourney: null,
      bookingClass: null,
      totTickets:null
    })
  }
  buildPassangerForm(): FormArray {
    return this.builder.array([]);
  }

  bookTicket(ticket:BookTicket){
    const observable = this.httpClient.post("http://localhost:8090/book",
    
    ticket,
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }

  getBookedTickets() {
    const observable = this.httpClient.get("http://localhost:8090/book",
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }

  constructor(private builder:FormBuilder,private httpClient:HttpClient) { }
}
