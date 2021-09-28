import { Component, ElementRef, OnInit, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeServiceService } from 'src/app/services/home-service.service';
import { StateserviceService } from 'src/app/services/stateservice.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  avlSeats = "";
  @ViewChild('book', { static: false }) book: ElementRef;
  @ViewChild('seats', { static: false }) seats: ElementRef;
  @ViewChild('checkAvl', { static: false }) checkAvl: ElementRef;

  bcBtnState:any;
  fcBtnState:any;
  scBtnState:any;
  tcBtnState:any;
  flights:any;
  jurneyDate:any;
  tkts:any;
  totTkts:any;
  fromCity:any;
  toCity:any;

  constructor(private renderer: Renderer2,private elRef: ElementRef,private state: StateserviceService, private service: HomeServiceService,private router: Router) { }

  ngOnInit() {
    this.fromCity = this.state.selFromcity;
    this.toCity = this.state.selToCity;
    this.flights = this.state.filteredFlights;
    this.jurneyDate = this.state.selJurDate;
    this.state.filteredFlights = undefined;
    this.state.selFromcity = undefined;
    this.state.selToCity = undefined;
    this.bcBtnState = Array.from({ length: this.flights.length }).fill('Check Avl');
    this.fcBtnState = Array.from({ length: this.flights.length }).fill('Check Avl');
    this.scBtnState = Array.from({ length: this.flights.length }).fill('Check Avl');
    this.tcBtnState = Array.from({ length: this.flights.length }).fill('Check Avl');
  }

  checkBcAvailability(index, flight){
    if(this.bcBtnState[index].search("Not Available") != -1){
      return;
    }
    if(this.bcBtnState[index].search("Book") != -1){
      this.state.selBookngClass = "BC";
      this.state.flightCode = flight["flightCode"];
      this.router.navigate(["/book-flight"]);
    }
    const observable = this.service.checkBookedSeats(this.jurneyDate,"BC");
    observable.subscribe((res)=>{
      this.tkts = res;
      this.totTkts = flight["bussinessClassSeats"];
      if(this.totTkts-this.tkts == 0){
        this.bcBtnState[index] = 'Not Available';
      }
      this.bcBtnState[index] = 'Book('+(this.totTkts-this.tkts)+' Seats)';
    })
  }
  checkFcAvailability(index, flight){
    const observable = this.service.checkBookedSeats(this.jurneyDate,"FC");
    observable.subscribe((res)=>{
      this.tkts = res;
      this.totTkts = flight["firstClassSeats"];
      this.fcBtnState[index] = 'Book('+(this.totTkts-this.tkts)+' Seats)';
    })
  }
  checkScAvailability(index, flight){
    const observable = this.service.checkBookedSeats(this.jurneyDate,"SC");
    observable.subscribe((res)=>{
      this.tkts = res;
      this.totTkts = flight["secondClassSeats"];
      this.scBtnState[index] = 'Book('+(this.totTkts-this.tkts)+' Seats)';
    })
  }
  checkTcAvailability(index, flight){
    const observable = this.service.checkBookedSeats(this.jurneyDate,"TC");
    observable.subscribe((res)=>{
      this.tkts = res;
      this.totTkts = flight["thirdClassSeats"];
      this.tcBtnState[index] = 'Book('+(this.totTkts-this.tkts)+' Seats)';
    })
  }

}
