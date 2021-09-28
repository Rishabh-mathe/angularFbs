import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAirlineServiceService } from 'src/app/services/add-airline-service.service';
import { HomeServiceService } from 'src/app/services/home-service.service';
import { StateserviceService } from 'src/app/services/stateservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchFlightForm:FormGroup;
  submitted = false;
  cities:any;
  constructor(private router: Router,private service:HomeServiceService, private state: StateserviceService) { }

  ngOnInit() {
    const observable = this.state.getAllCities();
    observable.subscribe((res)=>{
      this.cities = res;
    })

    this.searchFlightForm =this.buildForm();

  }
  buildForm(): FormGroup {
    return this.service.bulidSearchFlightForm();
  }
  findFlights(){
    console.log(this.searchFlightForm)
    this.submitted = true;
    if (this.searchFlightForm.invalid) {
      return;
    }
    const observable = this.service.searchFlights({
      to: this.searchFlightForm.value.to,
      from: this.searchFlightForm.value.from,
      journeyDate: this.searchFlightForm.value.journeyDate,
      bookingClass: this.searchFlightForm.value.bookingClass
    });
    observable.subscribe((res)=>{
      this.state.filteredFlights = res;
      this.state.selFromcity = this.cities.filter(city=>city.cityId == this.searchFlightForm.value.from)[0].cityName;
      this.state.selToCity = this.cities.filter(city=>city.cityId == this.searchFlightForm.value.to)[0].cityName;
      this.state.selJurDate = this.searchFlightForm.value.journeyDate;
      this.router.navigate(["/flight"]);
    },
    (err)=>{
      console.log(err);
      alert("error occured");
    })
  }


  logout(){
    const TOKEN_KEY = 'auth-token';
    window.sessionStorage.removeItem(TOKEN_KEY);
    this.router.navigate(["/login"])
  }
}
