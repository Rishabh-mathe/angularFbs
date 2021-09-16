import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginDto } from '../dtos/login-dto';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private builder:FormBuilder,private httpClient:HttpClient) { }
  buildLoginForm():FormGroup{
    return this.builder.group({
      username:"",
      password:""
    })
  }
  userAuth(loginuser: LoginDto) {
    
    const observable = this.httpClient.post("http://localhost:8090/user/authenticate",
    
    loginuser,
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }
}
