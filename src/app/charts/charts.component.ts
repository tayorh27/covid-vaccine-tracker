import { Component, OnInit } from "@angular/core";
// import { EChartsOption } from "echarts";
// import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import Chart from 'chart.js';
import { DummyData } from "../population-data";
// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "./variables/charts";

@Component({
    selector: 'charts-root',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css'],
})

export class ChartComponent implements OnInit {

    options: any;

    source = "";

    subDataTracker = [
        { "name": "health", "options": ["Total confirmed covid-19 cases", "Total confirmed deaths", "Available ventilators", "Health ODA received", "Hospital beds", "Vaccination logistics expenditure", "FGN Covid-19 support to state"] },
        { "name": "demography" , "options": ["Expectancy", "Share of population living in extreme poverty", "Population density", "Total population"] },
        { "name": "economics" , "options": ["GDP per capita", "2020 Multilateral debt service", "2020 Federal Allocation", "Bilateral debt service", "2020 revenue", "Growth rate", "State of available revenue", "Ability to meet recurrent expenditure", "Health budget (capital expenditure and total debt)"] },
        { "name": "governance" , "options": ["State budget allocations", "Covid-support measures", "Income support measures"] },
        { "name": "food" , "options": ["Food inflation", "People with insufficient food intake", "Children under the age of 5 with acute malnutrition", "Children under 5 with chronic malnutrition"] }
    ]

    displayOptions = []

    dataAxis = [
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'Federal Capital Territory',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara'
    ];

    data = [];

    ordersChart:any

    onTrackerChange(evt: any) {
        const option = this.subDataTracker.find((val, arr, ind) => {
            return val.name === evt.target.value
        })
        this.displayOptions = option.options;
    }

    onSubTrackerChanged(evt: any) {
        if(evt.target.value === "Total confirmed covid-19 cases") {
            this.data = new DummyData().mapData.map((val) => val.cases)
            this.ordersChart.destroy()
            this.viewChart()
            return
        }
        if(evt.target.value === "Total confirmed deaths") {
            this.data = new DummyData().mapData.map((val) => val.death)
            this.ordersChart.destroy()
            this.viewChart()
            return
        }
        if(evt.target.value === "Share of population living in extreme poverty") {
            this.source = "Source: Statista"
            this.data = new DummyData().mapData.map((val) => val.poverty)
            this.ordersChart.destroy()
            this.viewChart()
            return
        }
        if(evt.target.value === "Total population") {
            this.data = new DummyData().mapData.map((val) => val.population)
            this.ordersChart.destroy()
            this.viewChart()
            return
        }
        if(evt.target.value === "Vaccination logistics expenditure") {
            this.source = "Source: NPHCDA"
            this.data = new DummyData().mapData.map((val) => val.cost)
            this.ordersChart.destroy()
            this.viewChart()
            return
        }
        if(evt.target.value === "FGN Covid-19 support to state") {
            this.source = "Source: Federal Ministry of Finance, Presidential Task Force, UN, DPG-H, NCDC"
            this.data = new DummyData().mapData.map((val) => val.covid_support)
            this.ordersChart.destroy()
            this.viewChart()
            return
        }
    }

    updateChart() {

    }

    ngOnInit() {

        const option = this.subDataTracker.find((val, arr, ind) => {
            return val.name === "health"
        })

        this.displayOptions = option.options;

        this.data = new DummyData().mapData.map((val) => val.cases)
        this.viewChart()
    }

    onChartEvent(event: any, type: string) {
        console.log('chart event:', type, event);
    }

    // chartOption: EChartsOption = {
    //     xAxis: {
    //         type: 'category',
    //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //     },
    //     yAxis: {
    //         type: 'value',
    //     },
    //     series: [
    //         {
    //             data: [820, 932, 901, 934, 1290, 1330, 1320],
    //             type: 'line',
    //         },
    //     ],
    // };

    constestantChart = {
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            callback: function (value) {
                                // if (!(value % 10)) {
                                //     //return '$' + value + 'k'
                                    
                                // }
                                const formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    minimumFractionDigits: 2
                                  })
                                const f = formatter.format(value)
                                return f.substring(4, f.length - 3)
                            }
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 2
                          })
                          const f = formatter.format(item.yLabel)
                          const result = f.substring(4, f.length - 3)
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = (item.yLabel === 0) ? item.yLabel : result;
                        var content = "";
                        if (data.datasets.length > 1) {
                            content += label;
                        }
                        content += yLabel;
                        // console.log(item, data, content)
                        return content;
                    }
                }
            }
        },
    }

    viewChart() {
        const myData = {
            labels: this.dataAxis,
            datasets: [
                {
                    label: "",
                    data: this.data
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        parseOptions(Chart, chartOptions())
        this.ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: this.constestantChart.options,
            data: myData
        });
        // ordersChart.update();
    }

}