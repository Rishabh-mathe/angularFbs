import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddAirlineServiceService } from 'src/app/services/add-airline-service.service';
import { StateserviceService } from 'src/app/services/stateservice.service';
import { AirlineListDataSource, AirlineListItem } from './airline-list-datasource';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.css']
})
export class AirlineListComponent implements OnInit{
  airlines:any;
  displayedColumns: string[];
  dataSource: any;
    constructor(private router: Router,private stateService: StateserviceService, private airlineSrv: AddAirlineServiceService){}
  ngOnInit(): void {
    const observable = this.airlineSrv.getAirlines();
    
    observable.subscribe((res)=>{
      this.airlines = res;
      this.displayedColumns = ["airlineName", "ownerName", "ownerMobile", "ownerEmail", "totFlights", "activeFlights", "status"];      
      this.dataSource = this.airlines;
    })
  }
    

  editRow(data:any){
    this.stateService.data = data.id
    // this.stateService.data = "Hello Check pass";
    this.router.navigate(["/addAirline"])
    console.log(data)
  }
}
