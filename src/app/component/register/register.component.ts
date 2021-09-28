import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/dtos/register-dto';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register:RegisterDto
  registerForm:FormGroup;
  submitted = false;
  
  constructor(private service:RegisterServiceService,private router: Router ) {}

  ngOnInit() {
    const TOKEN_KEY = 'auth-token';
    if(window.sessionStorage.getItem(TOKEN_KEY)){
      this.router.navigate(["/"]);
      return true;
    }
    this.registerForm = this.buildForm();
  }

  get formControls() { return this.registerForm.controls; }

  buildForm():FormGroup{
    return this.service.buildRegisterForm()
  }

  registerUser(){
    console.log(this.registerForm)
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    
    const observable = this.service.userReg({
      name: this.registerForm.value.name,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone
    });
    observable.subscribe((res)=>{
      this.router.navigate(["/login"]);
    },
    (err)=>{
      console.log(err);
      alert("error occured");
    })
  }

}
