import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateserviceService {

  constructor(private httpClient:HttpClient) { }
  public data:any;
  public ticketData:any;
  //used to pass search data to flight page
  public filteredFlights:any;
  public selToCity:any;
  public selFromcity:any;
  public selJurDate:any;
  public selBookngClass:any;
  public flightCode:any;
  public getAllCities(){
    const observable = this.httpClient.get("http://localhost:8070/getcities",
    
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }
}
