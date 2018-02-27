import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { AppRoutingModule, RoutedComponents } from "./app.routing.module";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

import { AuthGuardService } from './shared/_guard/index';
import {
  TestService,
  UsersService,
  GlobalService,
  RequestOptionsProvider,
  StorageService,
  InstructionsService
} from './shared/_services/index';

// import { TestAckComponent } from './testAck/testAck.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutedComponents,
    // TestAckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TestService,
    UsersService,
    AuthGuardService,
    GlobalService,
    RequestOptionsProvider,
    StorageService,
    InstructionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
