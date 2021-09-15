import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule} from '@angular/http';  
import { ReactiveFormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router';  



import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './component/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path : '',  
        component : HomeComponent
      },
      {
        path : 'login',  
        component : LoginComponent 
      },
      {
        path : 'register',
        component: RegisterComponent
      }
    ])
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
