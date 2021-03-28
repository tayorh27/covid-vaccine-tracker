import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapsModule } from "@syncfusion/ej2-angular-maps";
import { ChartModule, ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from "@syncfusion/ej2-angular-charts";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapsModule,
    HttpClientModule,
    ChartModule,ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
