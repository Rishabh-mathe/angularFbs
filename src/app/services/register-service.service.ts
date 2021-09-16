import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterDto } from '../dtos/register-dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  

  constructor(private builder:FormBuilder,private httpClient:HttpClient) { }

  buildRegisterForm():FormGroup{
    return this.builder.group({
      name:"",
      password:"",
      phone:"",
      email:""
    })
  }

  userReg(user:RegisterDto) {
    const observable = this.httpClient.post("http://localhost:8090/user/register",
    
    user,
    {
      headers:{
        'content-type':'application/json'
      }
    });
    return observable;
  }
}
