import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchFlightDto } from '../dtos/search-flight-dto';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  
 
  constructor(private builder:FormBuilder,private httpClient:HttpClient) { }
  
  // this method is being used in app.component.ts
  findMyRole(){
    const observable = this.httpClient.get("http://localhost:8090/user/userRole",
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }

  bulidSearchFlightForm(): import("@angular/forms").FormGroup {
    return this.builder.group({
      from:[null,Validators.required],
      to:[null,[Validators.required]],
      journeyDate:[null,[Validators.required]],
      bookingClass:[null,[Validators.required]]
    })
  }

  searchFlights(searchString:SearchFlightDto){
    const observable = this.httpClient.post("http://localhost:8070/flight",
    searchString,
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }
  checkBookedSeats(jurneyDate: any, bookingClass: string) {
    const observable = this.httpClient.get("http://localhost:8070/flight/getAvlNumOfTkt?jurneyDate="+jurneyDate+"&bookingClass="+bookingClass,
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }




}