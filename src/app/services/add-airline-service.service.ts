import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineDto } from '../dtos/airline-dto';

@Injectable({
  providedIn: 'root'
})
export class AddAirlineServiceService {
  
  constructor(private builder:FormBuilder,private httpClient:HttpClient) { }

  buildAirlineForm(): FormGroup {
    return this.builder.group({
      id:0,
      airlineName: null,
      ownerName: null,
      ownerEmail: null,
      ownerMobile: null,
      airLineShortName: null,
      // flightRows: null
    })
  }

  buildFlightForm(): FormArray {
    return this.builder.array([]);
  }

  buildAddrForm(): FormArray {
    return this.builder.array([
    //   {
    //   street:"",
    //   pinCode:"",
    //   city: "",
    //   state:""
    // }
  ]);
  }
  createAddrFormGroup() {
    return this.builder.group({
        id:0,
        street:["",Validators.required],
        pinCode:["",Validators.required],
        city: ["",Validators.required],
        state:["",Validators.required]
    })
  }

  createFlightFormGroup(): FormGroup {
    return this.builder.group({
      id:0,
      flightCode: null,
      takeOff: null,
      landingTime: null,
      daysDto:null,
      bussinessClassSeats:null,
      bussinessClassSeatCost:null,
      firstClassSeats:null,
      firstClassSeatCost:null,
      secondClassSeats:null,
      secondClassSeatCost:null,
      thirdClassSeats:null,
      thirdClassSeatCost:null,
      meal:null,
      fromCity:null,
      toCity:null,
      discount:null
    });
  }



  //get airlines
  getAirlines(){
    const observable = this.httpClient.get("http://localhost:8070/airline",
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }

  createAirline(airline: AirlineDto) {
    const observable = this.httpClient.post("http://localhost:8090/admin/saveAirline",
    
    airline,
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }

  getFormData(data: any) {
    const observable = this.httpClient.get("http://localhost:8090/admin/getAirline?id="+data,
    
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }
  
}
