import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { AppRoutingModule, RoutedComponents } from "./app.routing.module";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { TestService } from './services/test.service';
// import { TestAckComponent } from './testAck/testAck.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutedComponents
    // TestAckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
