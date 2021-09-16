import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dtos/login-dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginuser:LoginDto
  loginForm:FormGroup;
  
  constructor(private service:AuthenticationService,private router: Router ) {}

  ngOnInit() {
    this.loginForm = this.buildForm();
  }

  buildForm():FormGroup{
    return this.service.buildLoginForm()
  }

  funcLogin(){
    const TOKEN_KEY = 'auth-token';
    const observable = this.service.userAuth({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
      
    });
    observable.subscribe((res)=>{
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, res["token"]);
        this.router.navigate([""])
        console.log(res);
    },
    (err)=>{
      this.router.navigate(["/login"]);
      console.log(err);
    })
  }
}
