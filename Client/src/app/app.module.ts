import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSiemaModule } from 'ngx-siema';
import { FacebookModule } from 'ngx-facebook';

import { SharedServicesModule, CommonDeptsModule, EnvironmentsModule, ReusablesModule } from './shared/';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app/app.component';
import { AuthModule } from './auth/';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersModule } from './users/';
import { EventsModule } from './events/';
import { HomeComponent } from './home/';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonDeptsModule,
    EnvironmentsModule.forRoot(),
    FacebookModule.forRoot(),
    NgxSiemaModule.forRoot(),
    SharedServicesModule.forRoot(),
    ReusablesModule,
    AuthModule,
    AppRoutes,
    EventsModule,
    UsersModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
