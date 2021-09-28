import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './component/register/register.component';
import { SearchFlightComponent } from './component/search-flight/search-flight.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AirlineComponent } from './component/airline/airline.component';
import { HttpInterceptorService } from './helper/http-interceptor.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AirlineListComponent } from './component/airline-list/airline-list.component';
import { ReplaceContantDirective } from './directives/replace-contant.directive';
import { BookTicketComponent } from './component/book-ticket/book-ticket.component';
import { BookedTicketsComponent } from './component/booked-tickets/booked-tickets.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    SearchFlightComponent,
    AirlineComponent,
    AirlineListComponent,
    ReplaceContantDirective,
    BookTicketComponent,
    BookedTicketsComponent
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
        path: 'addAirline',
        component: AirlineComponent
      },
      {
        path:'airline',
        component:AirlineListComponent
      }
      ,
      {
        path: 'flight',
        component: SearchFlightComponent
      },
      {
        path:'book-flight',
        component:BookTicketComponent
      },
      {
        path:'booking-history',
        component: BookedTicketsComponent
      }
    ]),
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    AuthenticationService,
    [
      { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
