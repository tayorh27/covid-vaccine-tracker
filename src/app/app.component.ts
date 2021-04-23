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
        template: '<div id="template"> <div class="toolback"> <div class="listing2"> <center> ${name} </center> </div> <hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"> <div> <span class="listing1">Total Vaccination : </span><span class="listing2">${total_vaccination}</span> <br> <span class="listing1">Total Vaccine Delivered : </span><span class="listing2">${total_vaccine_delivered}</span> <br> <span class="listing1">Cost to Deliver Vaccines : </span><span class="listing2">${total_cost_vaccine}</span> <br> <span class="listing1">Total Confirmed Cases : </span><span class="listing2">${total_confirmed}</span> <br> <span class="listing1">Total Confirmed Death : </span><span class="listing2">${total_death}</span> <br><span class="listing1">Total Confirmed Recovery : </span><span class="listing2">${total_recover}</span> <br><span class="listing1">Total Population : </span><span class="listing2">${total_population}</span><br> <span class="listing1">Total Population Living in Extreme Poverty : </span><span class="listing2">${total_poverty_pop}</span></div> </div> </div>'
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
    this.data.forEach(dt => {
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
  public data: any[] = [//Object
    { x: 'Abia', y: 12046, delivered: 4734, cost: 0, cases: 1689, death: 22, recover: 1651, population: 3727347, poverty: 1144295 }, 
    { x: 'Adamawa', y: 20549, delivered: 14240, cost: 0, cases: 1063, death: 32, recover: 274, population: 4248436, poverty: 3203745 },
    { x: 'Akwa Ibom', y: 12781, delivered: 4729, cost: 0, cases: 1847, death: 14, recover: 1766, population: 5482177, poverty: 1469223 }, 
    { x: 'Anambra', y: 11934, delivered: 3616, cost: 0, cases: 1909, death: 19, recover: 1826, population: 5527809, poverty: 818115 },
    { x: 'Bauchi', y: 36535, delivered: 33137, cost: 0, cases: 1548, death: 17, recover: 1518, population: 6537314, poverty: 4022409 }, 
    { x: 'Bayelsa', y: 10757, delivered: 5239, cost: 0, cases: 885, death: 26, recover: 855, population: 2277961, poverty: 514819 },
    { x: 'Benue', y: 22802, delivered: 14206, cost: 0, cases: 1188, death: 22, recover: 591, population: 5741815, poverty: 1889057 }, 
    { x: 'Borno', y: 22364, delivered: 13239, cost: 0, cases: 1337, death: 38, recover: 1200, population: 5860183, poverty: 987486 },
    { x: 'Cross River', y: 15961, delivered: 9465, cost: 0, cases: 394, death: 18, recover: 372, population: 3866269, poverty: 1403455 }, 
    { x: 'Delta', y: 22037, delivered: 11327, cost: 0, cases: 2617, death: 71, recover: 1744, population: 5663362, poverty: 339802 },
    { x: 'Ebonyi', y: 9741, delivered: 4120, cost: 0, cases: 2030, death: 32, recover: 1965, population: 2880383, poverty: 2297393 }, 
    { x: 'Edo', y: 29740, delivered: 21829, cost: 0, cases: 4898, death: 185, recover: 4709, population: 4235595, poverty: 508271 },
    { x: 'Ekiti', y:23685, delivered: 21174, cost: 0, cases: 869, death: 11, recover: 847, population: 3270798, poverty: 915823 }, 
    { x: 'Enugu', y: 13602, delivered: 5658, cost: 0, cases: 2345, death: 29, recover: 2013, population: 4411119, poverty: 2564183 },
    { x: 'Federal Capital Territory', y: 54298, delivered: 26823, cost: 0, cases: 19758, death: 165, recover: 19088, population: 3564126, poverty: 1379316 }, 
    { x: 'Gombe', y: 27404, delivered: 21046, cost: 0, cases: 2034, death: 44, recover: 1986, population: 3256962, poverty: 2029413 },
    { x: 'Imo', y: 19929, delivered: 9845, cost: 0, cases: 1657, death:37 , recover: 1592, population: 5408756, poverty: 1563130 }, 
    { x: 'Jigawa', y: 29426, delivered: 25277, cost: 0, cases: 527, death: 16, recover: 485, population: 5828163, poverty: 5071667 },
    { x: 'Kaduna', y: 58809, delivered: 38461, cost: 0, cases: 9038, death: 65, recover: 8935, population: 8252366, poverty: 3589779 }, 
    { x: 'Kano', y: 59374, delivered: 33665, cost: 0, cases: 3952, death: 110, recover: 3818, population: 13076892, poverty: 7205367 },
    { x: 'Katsina', y: 39693, delivered: 29293, cost: 0, cases: 2097, death: 34, recover: 2049, population: 7831319, poverty: 4418430 }, 
    { x: 'Kebbi', y: 16177, delivered: 9059, cost: 0, cases: 450, death: 16, recover: 392, population: 4440050, poverty: 2228905 },
    { x: 'Kogi', y: 12171, delivered: 8763, cost: 0, cases: 5, death: 2, recover: 33, population: 4473490, poverty: 1274944 }, 
    { x: 'Kwara', y: 31282, delivered: 35067, cost: 0, cases: 3120, death: 55, recover: 2814, population: 3192893, poverty: 651350 },
    { x: 'Lagos', y: 223159, delivered: 196157, cost: 0, cases: 58230, death: 439, recover: 56990, population: 12550598, poverty: 564777 }, 
    { x: 'Nasarawa', y: 18348, delivered: 10972, cost: 0, cases: 2381, death: 13, recover: 373, population: 2523395, poverty: 1445905 },
    { x: 'Niger', y: 27549, delivered: 20469, cost: 0, cases: 930, death: 17, recover: 913, population: 5556247, poverty: 3673234}, 
    { x: 'Ogun', y: 53355, delivered: 50314, cost: 0, cases: 4647, death: 49, recover: 4571, population: 5217716, poverty: 485248 },
    { x: 'Ondo', y: 31592, delivered: 27138, cost: 0, cases: 3242, death: 63, recover: 2080, population: 4671695, poverty: 583962 }, 
    { x: 'Osun', y: 21413, delivered: 14282, cost: 0, cases: 2575, death: 52, recover: 2492, population: 4705589, poverty: 399975 },
    { x: 'Oyo', y: 41171, delivered: 26555, cost: 0, cases: 6844, death: 123, recover: 6506, population: 7840864, poverty: 768405 }, 
    { x: 'Plateau', y: 28988, delivered: 15914, cost: 0, cases: 9049, death: 57, recover: 8982, population: 4200442, poverty: 2314443 },
    { x: 'Rivers', y: 30504, delivered: 12385, cost: 0, cases: 7073, death: 101, recover: 6931, population: 7303924, poverty: 1745638 }, 
    { x: 'Sokoto', y: 12016, delivered: 4206, cost: 0, cases: 775, death: 28, recover: 746, population: 4998090, poverty: 4384824 },
    { x: 'Taraba', y: 9471, delivered: 3192, cost: 0, cases: 974, death: 22, recover: 950, population: 3066834, poverty: 2690226 }, 
    { x: 'Yobe', y: 21354, delivered: 14798, cost: 0, cases: 371, death: 9, recover: 330, population: 3294137, poverty: 2382978 },
    { x: 'Zamfara', y: 16151, delivered: 93355, cost: 0, cases: 240, death: 2, recover: 3, population: 4515427, poverty: 3340513 }
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
