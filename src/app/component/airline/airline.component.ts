import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAirlineServiceService } from 'src/app/services/add-airline-service.service';
import { StateserviceService } from 'src/app/services/stateservice.service';


@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit, AfterViewInit{
  
  days = [];
  selectedItems = [];
  dropdownSettings = {};
  cities:any;
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  imageSrc: string;

  flights: FormArray;
  ownerAddress: FormArray;
  airLineForm: FormGroup;
  logoForm:FormGroup;
  editFormData:any;

  constructor(private http: HttpClient,private stateService: StateserviceService,private router: Router,private service: AddAirlineServiceService,private builder:FormBuilder) {}
  
  
  
  ngAfterViewInit(): void {
    console.log(this.stateService.data);
    
    if(this.stateService.data){
      const observable = this.service.getFormData(this.stateService.data);
      observable.subscribe((res)=>{
        res["flightSchedules"].forEach(element => {
          this.flights.push(this.builder.group({
            id:0,
            flightCode: "",
            takeOff: "",
            landingTime: "",
            daysDto:"",
            bussinessClassSeats:"",
            bussinessClassSeatCost:"",
            firstClassSeats:"",
            firstClassSeatCost:"",
            secondClassSeats:"",
            secondClassSeatCost:"",
            thirdClassSeats:"",
            thirdClassSeatCost:"",
            meal:"",
            fromCity:"",
            toCity:"",
            discount:""
          }))
        });
        const airlineName = res["airlineName"]
        this.imageSrc = "https://airline-logo.s3.ap-south-1.amazonaws.com/"+airlineName;
        this.airLineForm.setValue({ 
          id:res["id"],
          airlineName: res["airlineName"],
          ownerName: res["ownerName"],
          ownerEmail: res["ownerEmail"],
          ownerMobile: res["ownerMobile"],
          airLineShortName: res["airLineShortName"],
          ownerAddress: res["ownerAddress"],
          flights: res["flightSchedules"],
          
        })
      },
      (err)=>console.log(err))
    }
    
    this.stateService.data = undefined;
  }

  ngOnInit() {
  //code to save logo
  this.logoForm = this.builder.group({
    filee: [null]
  })


    const observable = this.stateService.getAllCities();
    observable.subscribe((res)=>{
      this.cities = res;
    })
    this.days = [
      "SUN","MON","TUE","WED","THU","FRI","SAT"
    ];
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    const TOKEN_KEY = 'auth-token';
    if(!window.sessionStorage.getItem(TOKEN_KEY)){
      this.router.navigate(["/login"]);
      return true;
    }
    this.airLineForm = this.buildForm();
    this.flights = this.addFlightForm();
    this.ownerAddress = this.addAddress();
    this.airLineForm.addControl('flights', this.flights);
    this.airLineForm.addControl('ownerAddress', this.ownerAddress);
    this.onAddAddrRow();
  }

  buildForm():FormGroup{
    return this.service.buildAirlineForm()
  }

  addFlightForm(): FormArray {
    return this.service.buildFlightForm()
  }

  addAddress(): FormArray {
    return this.service.buildAddrForm()
  }

  onAddAddrRow() {
    this.ownerAddress.push(this.builder.group({
      street:["",Validators.required],
      pinCode:["",Validators.required],
      city: ["",Validators.required],
      state:["",Validators.required]
  }));
  }

  onAddRow() {
    this.flights.push(this.service.createFlightFormGroup());
  }
  onRemoveRow(rowIndex:number){
    this.flights.removeAt(rowIndex);
  }
  saveAirline(){
    var formData: any = new FormData();
    formData.append("filee", this.logoForm.get('filee').value);

    this.http.post("http://localhost:8090/admin/saveAirlineLogo/"+this.airLineForm.value.airlineName, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    const observable = this.service.createAirline({
      id:this.airLineForm.value.id,
      airlineName: this.airLineForm.value.airlineName,
      ownerName: this.airLineForm.value.ownerName,
      ownerEmail: this.airLineForm.value.ownerEmail,
      ownerMobile: this.airLineForm.value.ownerMobile,
      airLineShortName: this.airLineForm.value.airLineShortName,
      flightSchedules: this.airLineForm.value.flights,
      ownerAddress: this.airLineForm.value.ownerAddress
    });
    observable.subscribe((res)=>{
      this.router.navigate(["/airline"]);
    },(err)=>{
      console.log(err);
    })
    console.log(this.airLineForm.value);
  }

  

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const file2 = (event.target as HTMLInputElement).files[0];
    this.logoForm.patchValue({
      filee: file2
    });
    this.logoForm.get('filee').updateValueAndValidity()
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        // this.myForm.patchValue({
        //   fileSource: reader.result
        // });
   
      };
   
    }
  }

}
