import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './component/register/register.component';
import { SearchFlightComponent } from './component/search-flight/search-flight.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    SearchFlightComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
      },
      {
        path: 'search-flight',
        component: SearchFlightComponent
      }
    ]),
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
