import { Component, OnInit } from "@angular/core";
// import { EChartsOption } from "echarts";
// import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import Chart from 'chart.js';
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

    subDataTracker = [
        { "name": "health" }, { "options": ["Total confirmed covid-19 cases", "Total confirmed deaths", "Available ventilators", "Health ODA received", "Hospital beds", "Vaccination logistics expenditure"] },
        { "name": "demography" }, { "options": ["Expectancy", "Share of population living in extreme poverty", "Population density", "Total population"] },
        { "name": "economics" }, { "options": ["GDP per capita", "2020 Multilateral debt service", "2020 Federal Allocation", "Bilateral debt service", "2020 revenue", "Growth rate", "State of available revenue", "Ability to meet recurrent expenditure", "Health budget (capital expenditure and total debt)"] },
        { "name": "governance" }, { "options": ["State budget allocations", "Covid-support measures", "Income support measures"] },
        { "name": "food" }, { "options": ["Food inflation", "People with insufficient food intake", "Children under the age of 5 with acute malnutrition", "Children under 5 with chronic malnutrition"] }
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
        'Edo', ,
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

    data = [
        220,
        182,
        191,
        234,
        290,
        330,
        310,
        123,
        442,
        321,
        90,
        149,
        210,
        122,
        133,
        334,
        198,
        123,
        125,
        220,
    ];

    onTrackerChange(evt: any) {
        const option = this.subDataTracker.find((val, arr, ind) => {
            return val.name === evt.target.value
        })
        this.displayOptions = option.options;
    }

    ngOnInit() {

        const option = this.subDataTracker.find((val, arr, ind) => {
            return val.name === "health"
        })

        this.displayOptions = option.options;

        this.viewChart()

        const yMax = 500;
        const dataShadow = [];

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.data.length; i++) {
            dataShadow.push(yMax);
        }

        this.options = {
            title: {
                text: '',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}',
            },
            xAxis: {
                data: this.dataAxis,
                axisLabel: {
                    inside: true,
                    color: '#fff',
                },
                axisTick: {
                    show: true,
                },
                axisLine: {
                    show: true,
                },
                z: 10,
            },
            yAxis: {
                axisLine: {
                    show: true,
                },
                axisTick: {
                    show: true,
                },
                axisLabel: {
                    textStyle: {
                        color: '#999',
                    },
                },
            },
            dataZoom: [
                {
                    type: 'outside',
                },
            ],
            series: [
                {
                    // For shadow
                    type: 'bar',
                    itemStyle: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: dataShadow,
                    animation: true,
                },
                {
                    type: 'bar',
                    itemStyle: {
                        // color: new LinearGradient(0, 0, 0, 1, [
                        //     { offset: 0, color: '#83bff6' },
                        //     { offset: 0.5, color: '#188df0' },
                        //     { offset: 1, color: '#188df0' },
                        // ]),
                    },
                    emphasis: {
                        itemStyle: {
                            // color: new LinearGradient(0, 0, 0, 1, [
                            //     { offset: 0, color: '#2378f7' },
                            //     { offset: 0.7, color: '#2378f7' },
                            //     { offset: 1, color: '#83bff6' },
                            // ]),
                        }
                    },
                    // this.data,
                },
            ],
        };
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
                                if (!(value % 10)) {
                                    //return '$' + value + 'k'
                                    return value;
                                }
                            }
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = item.yLabel;
                        var content = "";
                        if (data.datasets.length > 1) {
                            content += label;
                        }
                        content += yLabel;
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
        var ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: this.constestantChart.options,
            data: myData
        });
        // ordersChart.update();
    }

}