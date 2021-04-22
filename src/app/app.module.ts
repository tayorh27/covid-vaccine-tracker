import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapsModule } from "@syncfusion/ej2-angular-maps";
import { ChartModule, ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from "@syncfusion/ej2-angular-charts";
// import { NgxEchartsModule } from 'ngx-echarts';
import { ChartComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapsModule,
    HttpClientModule,
    ChartModule,ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule,
    // NgxEchartsModule.forRoot({
    //   /**
    //    * This will import all modules from echarts.
    //    * If you only need custom modules,
    //    * please refer to [Custom Build] section.
    //    */
    //   echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
