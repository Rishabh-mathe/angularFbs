import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptorService } from './helper/http-interceptor.service';
import { HomeServiceService } from './services/home-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn:boolean=false;
  loggedOut:boolean=false;
  admin:boolean=false;
  ngOnInit(): void {
    const TOKEN_KEY = 'auth-token';
    if(window.sessionStorage.getItem(TOKEN_KEY)){
      this.checkUserRole();
      this.loggedIn = true;
    }
    else{
      this.loggedOut = true;
    }
  }
  constructor(private service:HomeServiceService,private router: Router){}
  

  //TODO :need to be included in every component
  checkUserRole(){
    const observable = this.service.findMyRole();
    observable.subscribe((res)=>{
                            this.admin = true;
                            console.log(res)
                          },
                          (err)=>{
                            console.log(err)
                          });
  }
  logout(){
    const TOKEN_KEY = 'auth-token';
    window.sessionStorage.removeItem(TOKEN_KEY);
    this.router.navigate(["/login"])
  }
}

