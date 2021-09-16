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
  
  constructor(private service:RegisterServiceService,private router: Router ) {}

  ngOnInit() {
    const TOKEN_KEY = 'auth-token';
    if(window.sessionStorage.getItem(TOKEN_KEY)){
      this.router.navigate(["/home"]);
      return true;
    }
    this.registerForm = this.buildForm();
  }

  buildForm():FormGroup{
    return this.service.buildRegisterForm()
  }

  funcRegister(){
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
