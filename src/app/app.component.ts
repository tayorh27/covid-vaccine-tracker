import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery'
import { MapsTheme, Legend, Maps, Bubble, Zoom, IBubbleRenderingEventArgs, MapsTooltip, ILoadEventArgs, DataLabel, } from '@syncfusion/ej2-angular-maps';
Maps.Inject(Legend, Bubble, MapsTooltip, DataLabel, Zoom);
import { africaMap, nigeriaMap, worldMap } from "./world-map";
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
  total_vaccine_delivered?: string
  total_cost_vaccine?: string
  total_confirmed?: string
  total_death?: string
  total_recover?: string
  total_population?: string
  total_poverty_pop?: string
  date: string
  value_string: string
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
  vaccinesNig: Vaccines[] = []
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
    toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
    horizontalAlignment: 'Near',
    toolBarOrientation: 'Vertical',
    pinchZooming: true
  }

  public legendSettings: object = {
    visible: true,
    position: 'Bottom',
    height: '10',
    width: '80%',
    mode: 'Interactive',
    titleStyle: {
      size: '18px'
    },
    title: {
      text: 'Category'
    },
  }

  public titleSettings: object = {
    text: 'Covid-19 Vaccinations in Nigeria',
    titleStyle: {
      size: '16px'
    }
  }

  public layers: object[] = [
    {
      dataSource: this.vaccinesNig,
      shapeDataPath: 'name',
      shapePropertyPath: 'name',
      shapeData: nigeriaMap,
      shapeSettings: {
        colorValuePath: 'value',
        fill: '#167086',
        border: {
          color: 'white',
          width: 1.5
        },
        // autofill: true
        colorMapping: [
          {
            from: 0, to: 1000, color: '#DEEBAE', label: 'Low'
          },
          {
            from: 1001, to: 20000, color: '#A4D6AD', label: 'Moderate'
          },
          {
            from: 20001, to: 40000, color: '#37AFAB', label: 'High'
          },
        ],
      },
      dataLabelSettings: {
        visible: true,
        labelPath: 'name',
        // template: '<div id="marker1" style="color:white; font-size:10px;">${name}</div>',
        smartLabelMode: 'Hide',
        fill: '#ffffff'
      },
      tooltipSettings: {
        visible: true,
        valuePath: 'total_vaccination',
        template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${name} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Total Vaccination : </span><span class="listing2">${total_vaccination}</span> <br> <span class="listing1">Total Vaccine Delivered : </span><span class="listing2">${total_vaccine_delivered}</span> <br> <span class="listing1">Cost to Deliver Vaccines : </span><span class="listing2">${total_cost_vaccine}</span> <br> <span class="listing1">Total Confirmed Cases : </span><span class="listing2">${total_confirmed}</span> <br> <span class="listing1">Total Confirmed Deaths : </span><span class="listing2">${total_death}</span> <br><span class="listing1">Total Confirmed Recovery : </span><span class="listing2">${total_recover}</span> <br><span class="listing1">Total Population : </span><span class="listing2">${total_population}</span><br> <span class="listing1">Total Population Living in Extreme Poverty : </span><span class="listing2">${total_poverty_pop}</span></div> </div> </div>'
      },
      // bubbleSettings: [
      //   {
      //     visible: true,
      //     valuePath: 'value',
      //     colorValuePath: 'color',
      //     minRadius: 3,
      //     maxRadius: 70,
      //     opacity: 0.8,
      //     dataSource: this.vaccinesNig,//new DummyData().internetUsers,<div> <span class="listing1">Date : </span><span class="listing2">${date}</span> </div> 
      //     tooltipSettings: {
      //       visible: true,
      //       valuePath: 'total_vaccination',
      //       template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${name} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Total Vaccination : </span><span class="listing2">${total_vaccination}</span> </div> </div> </div>'
      //     },
      //   }
      // ]
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

  isDataByStateSelected = true

  switchDataButtons1() {
    this.isDataByStateSelected = true
  }

  switchDataButtons2() {
    this.isDataByStateSelected = false
  }

  setClickedStyle1() {
    if(this.isDataByStateSelected) {
      return {
        "background-color": "#00ffd9"
      }
    }
    return {
      "background-color": "white"
    }
  }

  setClickedStyle2() {
    if(!this.isDataByStateSelected) {
      return {
        "background-color": "#00ffd9"
      }
    }
    return {
      "background-color": "white"
    }
  }

  ngOnInit(): void {
    new DummyData().mapData.forEach(dt => {
      const vac: Vaccines = {
        date: "",
        color: "#333333",// this.generateColor(),
        name: dt.x,
        total_vaccination: this.formatNumbers(dt.y),
        value: dt.y,//this.bubblesize(dt.y),
        value_string: (dt.y < 5000) ? "Low" : (dt.y > 5001 && dt.y < 20000) ? "Moderate" : "High",
        total_vaccine_delivered: this.formatNumbers(dt.delivered),
        total_cost_vaccine: this.formatNumbers(dt.cost),
        total_confirmed: this.formatNumbers(dt.cases),
        total_death: this.formatNumbers(dt.death),
        total_recover: this.formatNumbers(dt.recover),
        total_population: this.formatNumbers(dt.population),
        total_poverty_pop: this.formatNumbers(dt.poverty),
      }
      this.vaccinesNig.push(vac)
    })
    this.loaded = true
    // console.log(this.vaccinesNig)
    // console.log(this.findColorByCountry("Nigeria"))
    // this.writeNigeriaAlgorithm()
    // this.http.get("https://api.mediahack.co.za/vaccines/owid.php").subscribe(res => {
    //   // console.log(res)
    //   const arr: any = res
    //   console.log(arr)
    //   if (res) {
    //     arr.forEach((element: any) => {
    //       // console.log(element.location)
    //       const vac: Vaccines = {
    //         date: element.date,
    //         color: "#333333",// this.generateColor(),
    //         name: element.location,
    //         total_vaccination: element.total_vaccinations,
    //         value: this.bubblesize(element.total_vaccinations),
    //         value_string: ""
    //       }
    //       this.vaccines.push(vac)
    //     });
    //     this.last_update = this.getDataByLocation("africa").date ?? ""
    //     this.worldwide_vaccine = this.formatNumbers(Number(this.getDataByLocation("world").total_vaccination)) ?? "0"
    //     this.africa_vaccine = this.formatNumbers(Number(this.getDataByLocation("africa").total_vaccination)) ?? "0"
    //     this.nigeria_vaccine = this.formatNumbers(Number(this.getDataByLocation("nigeria").total_vaccination)) ?? "0"
    //     this.loaded = true
    //     // console.log(this.vaccines)
    //   }
    // })

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

  featuresData: any[] = []

  writeNigeriaAlgorithm() {

    const nigeria = new DummyData().nigeria_data

    nigeria.forEach(nig => {

      const coords = []

      const list_single_state = nigeria.filter((val, ind, arr) => {
        return val.admin_name === nig.admin_name
      })

      list_single_state.forEach(state => {
        coords.push([Number(state.lat), Number(state.lng)])
      })

      const exist = this.checkIfExists(nig.admin_name)
      if (!exist) {
        this.featuresData.push({
          "type": "Feature",
          "properties": {
            "admin": "Nigeria",
            "name": nig.admin_name,
            "iso_3166_2": "NG"//`${nig.admin_name}`.substring(0, 2).toUpperCase()
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [coords]
          }
        })
      } else {
        const index = this.findIndex(nig.admin_name)
        this.featuresData.splice(index, 1)
        this.featuresData.push({
          "type": "Feature",
          "properties": {
            "admin": "Nigeria",
            "name": nig.admin_name,
            "iso_3166_2": "NG"//`${nig.admin_name}`.substring(0, 1).toUpperCase()
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [coords]
          }
        })
      }

    })

    console.log(this.featuresData.length)

    const final = {
      "type": "FeatureCollection",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features": this.featuresData
    }

    console.log(JSON.stringify(final))
  }

  findIndex(state: any) {
    return this.featuresData.findIndex((val, ind, arr) => {
      return val.properties.name === state
    })
  }

  checkIfExists(state: any) {
    if (this.featuresData.length === 0) {
      return false
    }

    const getData = this.featuresData.find((val, ind, arr) => {
      return val.properties.name === state
    })

    return getData !== undefined
  }

}

// const scrollToTop = () => {
//   const c = document.documentElement.scrollTop || document.body.scrollTop;
//   if (c > 0) {
//     window.requestAnimationFrame(scrollToTop);
//     window.scrollTo(0, c - c / 8);
//   }
// };
