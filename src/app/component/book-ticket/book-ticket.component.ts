import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookTicketSrvService } from 'src/app/services/book-ticket-srv.service';
import { StateserviceService } from 'src/app/services/stateservice.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit, AfterViewInit {
  ticket: FormGroup;
  passangerDlt: FormArray;
  totalTks:any=0;
  flightCode:any;
  journeyDate:any;
  bookingClass:any;
  edit:boolean=true;
  constructor(private router: Router,private builder:FormBuilder, private service: BookTicketSrvService, private state: StateserviceService) { }
  ngAfterViewInit(): void {
    if(this.state.ticketData){
      this.edit = false;
      const observable = this.service.getFormData(this.state.ticketData);
      observable.subscribe((res)=>{
        res["passangerDtl"].forEach(element => {
          this.passangerDlt.push( this.builder.group({
            id:[""],
            passangerName:["",Validators.required],
            passangerAge:["",Validators.required],
            foodType: ["",Validators.required],
            gender:["",Validators.required],
            ticketStatus:["",Validators.required]
          }))
        });
        this.ticket.setValue({
          id: res["id"],
          flightId: res["flightId"],
          dateOfJourney: res["dateOfJourney"],
          bookingClass: res["bookingClass"],
          totTickets: res["totTickets"],
          passangerDlt:res["passangerDtl"]
        })
      })
    }
    
  }

  ngOnInit() {
    
    this.ticket = this.buildForm();
    this.passangerDlt = this.addPassangerForm();
    this.ticket.addControl('passangerDlt', this.passangerDlt);
    if(this.state.flightCode){
      this.ticket.setValue({ 
        flightId: this.state.flightCode,
        dateOfJourney: this.state.selJurDate,
        bookingClass: this.state.selBookngClass,
        totTickets: 0,
        id:0,
        passangerDlt:[]
        
      })
    }
    
    this.state.flightCode = undefined;
    this.state.selJurDate = undefined;
    this.state.selBookngClass = undefined;
  }
  addPassangerForm(): FormArray {
    return this.service.buildPassangerForm();
  }
  buildForm(): FormGroup {
    return this.service.buildTicketForm()
  }

  onAddRow() {
    this.totalTks = this.totalTks + 1;
    this.passangerDlt.push(this.service.createPassangerFormGroup());
  }
  onRemoveRow(rowIndex:number){
    this.totalTks = this.totalTks - 1;
    this.passangerDlt.removeAt(rowIndex);
  }
  // cancelTkt(_eval){
  //   console.log(_eval);
  //   this.totalTks = this.totalTks - 1;
  // }
  bookTicket(){
    this.ticket.value.totTickets = 0;
    this.ticket.value.passangerDlt.forEach(function(passanger){
      if(passanger["ticketStatus"] == "Confirm"){
        this.ticket.value.totTickets+=1;
      }
    })
    const observable = this.service.bookTicket({
      id: this.ticket.value.id,
      flightId: this.ticket.value.flightId,
      dateOfJourney: this.ticket.value.dateOfJourney,
      bookingClass: this.ticket.value.bookingClass,
      totTickets: this.ticket.value.totTickets,
      passangerDtl: this.ticket.value.passangerDlt
    });
    observable.subscribe((res)=>{
      this.router.navigate(["/airline"]);
    },(err)=>{
      console.log(err);
    })
    
    console.log(this.ticket.value);
  }

}
