import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery'
import { MapsTheme, Maps, Bubble, IBubbleRenderingEventArgs, MapsTooltip, ILoadEventArgs, DataLabel, } from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-angular-maps';
Maps.Inject(Bubble, MapsTooltip, DataLabel);
import { africaMap, worldMap } from "./world-map";
import { DummyData } from './population-data';
import { HttpClient } from '@angular/common/http';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
// import { Browser } from '@syncfusion/ej2-base';

export interface Data { value?: number; }
export interface Vaccines {
  name: string//country name
  value: number//bubble size
  color: string//color
  total_vaccination: string
  date: string
}
declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  last_update = ""
  worldwide_vaccine = "0"
  africa_vaccine = "0"
  nigeria_vaccine = "0"


  vaccines: Vaccines[] = []
  loaded = false

  @ViewChild('maps') public maps: Maps;
  // custom code start
  public load = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
  }
  // custom code end
  public zoomSettings: object = {
    enable: true,
    horizontalAlignment: 'Near',
    toolBarOrientation: 'Vertical',
    pinchZooming: true
  }

  public titleSettings: object = {
    text: 'Covid-19 Vaccainations in Africa',
    titleStyle: {
      size: '16px'
    }
  }

  public layers: object[] = [
    {
      shapeDataPath: 'name',
      shapePropertyPath: 'name',
      shapeData: africaMap,
      shapeSettings: {
        // fill: '#E5E5E5'
        autofill: true
      },
      dataLabelSettings: {
        visible: true,
        labelPath: 'name',
        smartLabelMode: 'Hide',
      },
      bubbleSettings: [
        {
          visible: true,
          valuePath: 'value',
          colorValuePath: 'color',
          minRadius: 3,
          maxRadius: 70,
          opacity: 0.8,
          dataSource: this.vaccines,//new DummyData().internetUsers,
          tooltipSettings: {
            visible: true,
            valuePath: 'total_vaccination',
            template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${name} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Date : </span><span class="listing2">${date}</span> </div> <div> <span class="listing1">Total Vaccination : </span><span class="listing2">${total_vaccination}</span> </div> </div> </div>'
          },
        }
      ]
    }
  ]

  public _layers: object[] = [
    {
      dataLabelSettings: {
        visible: true,
        labelPath: 'name',
        smartLabelMode: 'Trim',
        dataSource: this.vaccines,
        tooltipSettings: {
          visible: true,
          valuePath: 'name',
          template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${name} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Date : </span><span class="listing2">${date}</span> </div> <div> <span class="listing1">Total Vaccination : </span><span class="listing2">${total_vaccination}</span> </div> </div> </div>'
        },
      },
      shapeData: africaMap,
      shapeSettings: {
        autofill: true
      },
      tooltipSettings: {
        visible: true,
        valuePath: 'total_vaccination',
        template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${name} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Date : </span><span class="listing2">${date}</span> </div> <div> <span class="listing1">Total Vaccination : </span><span class="listing2">${total_vaccination}</span> </div> </div> </div>'
      },
    }
  ];

  public bubbleRendering = (args: IBubbleRenderingEventArgs) => {
    args.radius = (args.data as Data).value;
  }

  constructor(private http: HttpClient) {
    // @Inject('sourceFiles') private sourceFiles: anysourceFiles.files = ['population-data.ts', 'world-map.json'];
  }

  ngOnInit(): void {
    // console.log(this.findColorByCountry("Nigeria"))
    this.http.get("https://api.mediahack.co.za/vaccines/owid.php").subscribe(res => {
      // console.log(res)
      const arr:any = res
      console.log(arr)
      if (res) {
        arr.forEach((element: any) => {
          // console.log(element.location)
          const vac: Vaccines = {
            date: element.date,
            color: "#333333",// this.generateColor(),
            name: element.location,
            total_vaccination: element.total_vaccinations,
            value: this.bubblesize(element.total_vaccinations)
          }
          this.vaccines.push(vac)
        });
        this.last_update = this.getDataByLocation("africa").date ?? ""
        this.worldwide_vaccine = this.formatNumbers(Number(this.getDataByLocation("world").total_vaccination)) ?? "0"
        this.africa_vaccine = this.formatNumbers(Number(this.getDataByLocation("africa").total_vaccination)) ?? "0"
        this.nigeria_vaccine = this.formatNumbers(Number(this.getDataByLocation("nigeria").total_vaccination)) ?? "0"
        this.loaded = true
        // console.log(this.vaccines)
      }
    })

  }

  bubblesize(value: number): number {
    let max: number = 1347565324;
    let min: number = 324366;
    let maxBox: number = 70 * 70 * 2 * Math.PI;
    let minBox: number = 3 * 3 * 2 * Math.PI;
    let box: number = (value - min) / (max - min) * (maxBox - minBox) + minBox;
    if (box < minBox) {
      box = minBox;
    }
    return (Math.sqrt(box / (Math.PI * 2)) / 2) * 5;
  }

  // findColorByCountry(country:string) {
  //   const _getcolor = new DummyData().population.filter((val,ind,arr) => {
  //     return val.name === country
  //   })
  //   if(_getcolor.length > 0) {
  //     return _getcolor[0].color
  //   }else {
  //     return "#F39D42";
  //   }
  // }

  getDataByLocation(location: string) {
    return this.vaccines.find((val, ind, arr) => {
      return val.name.toLowerCase() === location.toLowerCase()
    })
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  formatNumbers(value: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })
    const f = formatter.format(value)
    return f.substring(4, f.length - 3)
  }

  generateColor() {
    var color = "#";
    const arr = "ABCDEF1234567890"
    for (let index = 0; index < 6; index++) {
      const num = this.randomInt(0, 15)
      const element = arr[num];
      color += element
    }
    return color
  }

  title = 'covid-vaccine-tracker';

  startLoading() {
    $('.loading-sp').css({
      'display': 'inline-block',
    });

    $('.lbl').hide();
  }

  stopLoading() {
    $('.loading-sp').css({
      'display': 'none',
    });

    $('.lbl').show();
  }

  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  //Initializing Chart Width
  public width: string = "100%"//Browser.isDevice ? '100%' : '60%';
  public data: Object[] = [
    { x: 'Abia', y: 0 }, { x: 'Adamawa', y: 4150 },
    { x: 'Akwa Ibom', y: 55 }, { x: 'Anambra', y: 10 },
    { x: 'Bauchi', y: 14422 }, { x: 'Bayelsa', y: 358 },
    { x: 'Benue', y: 65 }, { x: 'Borno', y: 2 },
    { x: 'Cross River', y: 366 }, { x: 'Delta', y: 214 },
    { x: 'Ebonyi', y: 8 }, { x: 'Edo', y: 1267 },
    { x: 'Ekiti', y: 67 }, { x: 'Enugu', y: 277 },
    { x: 'FCT', y: 5232 }, { x: 'Gombe', y: 158 },
    { x: 'Imo', y: 706 }, { x: 'Jigawa', y: 19226 },
    { x: 'Kaduna', y: 7099 }, { x: 'Kano', y: 1495 },
    { x: 'Katsina', y: 3401 }, { x: 'Kebbi', y: 0 },
    { x: 'Kogi', y: 0 }, { x: 'Kwara', y: 5302 },
    { x: 'Lagos', y: 36009 }, { x: 'Nasarawa', y: 5133 },
    { x: 'Niger', y: 0 }, { x: 'Ogun', y: 9765 },
    { x: 'Ondo', y: 887 }, { x: 'Osun', y: 3234 },
    { x: 'Oyo', y: 0 }, { x: 'Plateau', y: 305 },
    { x: 'Rivers', y: 699 }, { x: 'Sokoto', y: 0 },
    { x: 'Taraba', y: 0 }, { x: 'Yobe', y: 2498 },
    { x: 'Zamfara', y: 0 }
  ];
  //Initializing Marker
  public marker: Object = {
    dataLabel: {
      visible: true,
      position: 'Top',
      font: {
        fontWeight: '600', color: '#ffffff'
      }
    }
  }
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',
    title: 'State',
    interval: 1,
    majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '{value}',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: {
      color: 'transparent'
    }
  };
  public tooltip: Object = {
    enable: true
  };
  // custom code start
  public loadBar(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };
  // custom code end
  barTitle: string = 'Covid-19 Vaccinations in Nigeria';

}

// const scrollToTop = () => {
//   const c = document.documentElement.scrollTop || document.body.scrollTop;
//   if (c > 0) {
//     window.requestAnimationFrame(scrollToTop);
//     window.scrollTo(0, c - c / 8);
//   }
// };
