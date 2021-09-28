import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from '../dtos/register-dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  

  constructor(private builder:FormBuilder,private httpClient:HttpClient) { }

  buildRegisterForm():FormGroup{
    return this.builder.group({
      name:[null,Validators.required],
      password:[null,[Validators.required,Validators.minLength(6)]],
      phone:[null,[Validators.required, Validators.max(9999999999),Validators.min(999999999)]],
      email:[null,[Validators.required,Validators.email]]
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
