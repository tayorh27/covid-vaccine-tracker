import { Component, OnInit } from "@angular/core";
// import { EChartsOption } from "echarts";
// import LinearGradient from 'zrender/lib/graphic/LinearGradient';
import Chart from 'chart.js';
import { economicData, economicData2 } from "../economy-data";
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
        { "name": "health", "options": ["-", "Total Confirmed Covid-19 Cases", "Total Confirmed Deaths", "Vaccination Logistics Expenditure", "FGN Covid-19 Support to State"] },
        { "name": "demography", "options": ["-", "Life Expectancy", "Share of Population Living in Extreme Poverty", "Population Density", "Total Population"] },
        { "name": "economy", "options": ["-", "Revenue Analysis", "6-Year Growth Analyis", "Structure of State Available Revenue", "2019 Ability to Meet Recurrent Expenditure", "Actual Expenditure 2019", "Health Budget", "Actual Capital Expenditure", "Total Debt", "Debt Stock 2019",  "Debt Stock 2019 - 2", "Debt Growth", "Debt Size", "Total Debt Trend (2014 - 2019)"] },
        { "name": "governance", "options": ["-", "State Budget Allocations", "Covid-Support Measures", "Income Support Measures"] },
        { "name": "food", "options": ["-", "Food Inflation", "People with Insufficient Food Intake", "Children under the age of 5 with acute malnutrition", "Children under 5 with chronic malnutrition"] }
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

    ordersChart: any

    onTrackerChange(evt: any) {
        const option = this.subDataTracker.find((val, arr, ind) => {
            return val.name === evt.target.value
        })
        this.displayOptions = option.options;
    }

    onSubTrackerChanged(evt: any) {
        if (evt.target.value === "Total Confirmed Covid-19 Cases") {
            this.data = new DummyData().mapData.map((val) => val.cases)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Total Confirmed Covid-19 Cases", "#de5460")
            return
        }
        if (evt.target.value === "Total Confirmed Deaths") {
            this.data = new DummyData().mapData.map((val) => val.death)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Total Confirmed Deaths", "#d93b4a")
            return
        }
        if (evt.target.value === "Share of Population Living in Extreme Poverty") {
            this.source = "Source: Statista"
            this.data = new DummyData().mapData.map((val) => val.poverty)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Share of Population Living in Extreme Poverty", "#de5460")
            return
        }
        if (evt.target.value === "Total Population") {
            this.data = new DummyData().mapData.map((val) => val.population)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Total Population", "#00aeaa")
            return
        }
        if (evt.target.value === "Vaccination Logistics Expenditure") {
            this.source = "Source: NPHCDA"
            this.data = new DummyData().mapData.map((val) => val.cost)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Vaccination Logistics Expenditure", "#00aeaa")
            return
        }
        if (evt.target.value === "FGN Covid-19 support to state") {
            this.source = "Source: Federal Ministry of Finance, Presidential Task Force, UN, DPG-H, NCDC"
            this.data = new DummyData().mapData.map((val) => val.covid_support)
            this.ordersChart.destroy()
            this.viewChartForGeneral("FGN Covid-19 Support to State", "#00aeaa")
            return
        }

        //For Economy
        if (evt.target.value === "Revenue Analysis") {
            this.source = "Source: Budgit"
            const data1 = economicData.map((val) => val.Revenue_Analysis_IGR)
            const data2 = economicData.map((val) => val.Revenue_Analysis_Net_FACC)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Revenue Analysis[2014 - 2019] - IGR (NGN)", "Revenue Analysis[2014 - 2019] - NET FACC (NGN)", data1, data2, false, false, ["#4bc0c0","#36a2eb"])
            return
        }

        if (evt.target.value === "6-Year Growth Analyis") {
            this.source = "Source: Budgit"
            const data1 = economicData2.map((val) => val.Year_Growth_Analyis_IGR)
            const data2 = economicData2.map((val) => val.Year_Growth_Analyis_Net_FACC)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("6-Year Growth Analyis[2014 - 2019] - IGR (%)", "6-Year Growth Analyis[2014 - 2019] - NET FACC (%)", data1, data2, true, false, ["#4bc0c0","#36a2eb"])
            return
        }

        if (evt.target.value === "Structure of State Available Revenue") {
            this.source = "Source: Budgit"
            const data1 = economicData2.map((val) => val.Structure_of_State_Available_Revenue_IGR)
            const data2 = economicData2.map((val) => val.Structure_of_State_Available_Revenue_Net_FACC)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Structure of State Available Revenue[2019] - IGR (%)", "Structure of State Available Revenue[2019] - NET FACC (%)", data1, data2, true, false, ["#4bc0c0","#36a2eb"])
            return
        }

        if (evt.target.value === "2019 Ability to Meet Recurrent Expenditure") {
            this.source = "Source: Budgit"
            const data1 = economicData.map((val) => val.Ability_to_meet_Recurrent_Expenditure_total_revenue)
            const data2 = economicData.map((val) => val.Ability_to_meet_Recurrent_Expenditure_recurrent_expenditure)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Total Revenue (NGN)", "Recurrent Expenditure (NGN)", data1, data2, false, false, ["#4bc0c0","#d93b4a"])
            return
        }

        if (evt.target.value === "Actual Expenditure 2019") {
            this.source = "Source: Budgit"
            const data1 = economicData.map((val) => val.Actual_Expenditure_2019_Capital_Expenditure)
            const data2 = economicData.map((val) => val.Actual_Expenditure_2019_Recurrent_Expenditure)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Capital Expenditure (NGN)", "Recurrent Expenditure (NGN)", data1, data2, false, false, ["#4bc0c0","#d93b4a"])
            return
        }
        if (evt.target.value === "Health Budget") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Health_Budget_per_capita)
            this.ordersChart.destroy()
            this.viewChartForEconomy("2020 Health Budget (per capita) - NGN", "#36a2eb")
            return
        }
        if (evt.target.value === "Actual Capital Expenditure") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Actual_Capital_Expenditure_per_capita)
            this.ordersChart.destroy()
            this.viewChartForEconomy("2020 Actual Capital Expenditure (per capita) - NGN", "#4bc0c0")
            return
        }
        if (evt.target.value === "Total Debt") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Total_Debt_per_capita)
            this.ordersChart.destroy()
            this.viewChartForEconomy("2020 Total Debt (per capita) - NGN", "#d93b4a")
            return
        }
        if (evt.target.value === "Debt Stock 2019") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Debt_Stock_2019_Domestic_Debt)
            const data2 = economicData.map((val) => val.Debt_Stock_2019_External_Debt)//1000000000
            this.ordersChart.destroy()
            this.viewChartForEconomy("Domestic Debt (NGN)","#d93b4a")
            // this.viewChartForEconomyStacked("Domestic Debt (NGN)", "External Debt (USD)", data1, data2, false, true, ["#","#d93b4a"])
            return
        }
        if (evt.target.value === "Debt Stock 2019 - 2") {
            this.source = "Source: Budgit"
            const data1 = economicData.map((val) => val.Debt_Stock_2019_Domestic_Debt)
            this.data = economicData.map((val) => val.Debt_Stock_2019_External_Debt / 1000000000)//1000000000
            this.ordersChart.destroy()
            this.viewChartForEconomy("External Debt (USD)","#d93b4a")
            // this.viewChartForEconomyStacked("Domestic Debt (NGN)", "External Debt (USD)", data1, data2, false, true, ["#","#d93b4a"])
            return
        }
        if (evt.target.value === "Debt Growth") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Debt_Growth)
            this.ordersChart.destroy()
            this.viewChartForEconomy("Debt Growth[2014 - 2019] (%)", "#d93b4a")
            return
        }
        if (evt.target.value === "Debt Size") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Debt_Size)
            this.ordersChart.destroy()
            this.viewChartForEconomy("2020 Debt Size (position)", "#d93b4a")
            return
        }
        if (evt.target.value === "Total Debt Trend (2014 - 2019)") {
            this.source = "Source: Budgit"
            const data = economicData.map((val) => val.Total_Debt_Trend_2014_2019[0])
            const data2 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[1])
            const data3 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[2])
            const data4 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[3])
            const data5 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[4])
            const data6 = economicData.map((val) => val.Total_Debt_Trend_2014_2019[5])
            // console.log(data,data2,data3,data4,data5)
            this.ordersChart.destroy()
            this.viewChartForEconomyLine(data,data2,data3,data4,data5, data6)
            return
        }
        this.data = []
        this.ordersChart.destroy()
        this.viewChartForGeneral("No data available yet","#")
    }

    updateChart() {

    }

    ngOnInit() {

        const option = this.subDataTracker.find((val, arr, ind) => {
            return val.name === "health"
        })

        this.displayOptions = option.options;

        this.data = new DummyData().mapData.map((val) => val.cases)
        this.viewChartForGeneral("Total Confirmed Covid-19 Cases", "#de5460")
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

    generalChart = {
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            callback: function (value) {
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
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legend Title',
                    }
                }
            },
            responsive: true,
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        const formatter = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 2
                        })
                        const f = formatter.format(item.yLabel)
                        var result = f.substring(4, f.length - 3)

                        if (`${item.yLabel}`.includes(".")) {
                            result = item.yLabel;
                        }
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

    economyChartStacked = {
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                },
                yAxes: [
                    {
                        ticks: {
                            callback: function (value) {
                                const formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    minimumFractionDigits: 2
                                })
                                const f = formatter.format(value)
                                return `${f.substring(4, f.length - 3)}`
                            }
                        }
                    }
                ]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legend Title',
                    }
                }
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
                        content += `:\n${yLabel}`;
                        // console.log(item, data, content)
                        return content;
                    }
                }
            }
        },
    }

    economyChartStackedPercentage = {
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                },
                yAxes: [
                    {
                        ticks: {
                            callback: function (value) {
                                return value
                            }
                        }
                    }
                ]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legend Title',
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        const result = item.yLabel;
                        var label = data.datasets[item.datasetIndex].label || "";
                        var yLabel = (item.yLabel === 0) ? item.yLabel : result;
                        var content = "";
                        if (data.datasets.length > 1) {
                            content += label;
                        }
                        content += `:\n${yLabel}`;
                        // console.log(item, data, content)
                        return content;
                    }
                }
            }
        },
    }

    economyChartStackedDebtStock = {
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                },
                yAxes: [
                    {
                        ticks: {
                            // stepSize: 5,
                            callback: function (value) {
                                const formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'NGN',
                                    minimumFractionDigits: 2
                                })
                                const f = formatter.format(value)
                                return `${f.substring(4, f.length - 3)}`
                            }
                        }
                    }
                ]
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                },
                legend: {
                    title: {
                        display: true,
                        text: 'Legend Title',
                    }
                }
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
                        content += `:\n${yLabel}`;
                        // console.log(item, data, content)
                        return content;
                    }
                }
            }
        },
    }

    economyChartLines = {
        options: {
            responsive: true,
            // interaction: {
            //     mode: 'index',
            //     intersect: false,
            // },
            // stacked: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Multi Axis'
                }
            },
            // scales: {
            //     y: {
            //         type: 'linear',
            //         display: true,
            //         position: 'left',
            //     },
            //     y1: {
            //         type: 'linear',
            //         display: true,
            //         position: 'right',

            //         // grid line settings
            //         grid: {
            //             drawOnChartArea: false, // only want the grid lines for one axis to show up
            //         },
            //     },
            //     y2: {
            //         type: 'linear',
            //         display: true,
            //         position: 'left',
            //     },
            //     y3: {
            //         type: 'linear',
            //         display: true,
            //         position: 'right',

            //         // grid line settings
            //         grid: {
            //             drawOnChartArea: false, // only want the grid lines for one axis to show up
            //         },
            //     },
            //     y4: {
            //         type: 'linear',
            //         display: true,
            //         position: 'left',
            //     },
            //     y5: {
            //         type: 'linear',
            //         display: true,
            //         position: 'right',

            //         // grid line settings
            //         grid: {
            //             drawOnChartArea: false, // only want the grid lines for one axis to show up
            //         },
            //     },
            // }
        },
    };

    viewChartForGeneral(title: string, color:string) {
        const myData = {
            labels: this.dataAxis,
            datasets: [
                {
                    label: title,
                    data: this.data,
                    borderColor: color,//"#00ffd9",
                    backgroundColor: color,
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        // parseOptions(Chart, chartOptions())
        this.ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: this.generalChart.options,
            data: myData
        });
        // ordersChart.update();
    }

    viewChartForEconomy(title: string, color:string) {
        const myData = {
            labels: economicData.map((val) => val.x),
            datasets: [
                {
                    label: title,
                    data: this.data,
                    borderColor: color,
                    backgroundColor: color,
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        // parseOptions(Chart, chartOptions())
        this.ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: this.generalChart.options,
            data: myData
        });
        // ordersChart.update();
    }

    viewChartForEconomyStacked(title1: string, title2: string, data1: any, data2: any, isPercent: boolean, debt_stock:boolean = false, color:string[]) {
        const myData = {
            labels: economicData.map((val) => val.x),
            datasets: [
                {
                    label: title1,
                    data: data1,
                    borderColor: color[0],
                    backgroundColor: color[0],
                },
                {
                    label: title2,
                    data: data2,
                    borderColor: color[1],
                    backgroundColor: color[1],
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        // parseOptions(Chart, chartOptions())
        this.ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: (isPercent) ? this.economyChartStackedPercentage.options : (debt_stock) ? this.economyChartStackedDebtStock.options : this.economyChartStacked.options,
            data: myData
        });
        // ordersChart.update();
    }

    viewChartForEconomyLine(data:any,data2:any,data3:any,data4:any,data5:any,data6:any) {
        const myData = {
            labels: economicData.map((val) => val.x),
            datasets: [
                {
                    label: '2014 NGN ',
                    data: data,
                    borderColor: '#172b4d',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y',
                },
                {
                    label: '2015 NGN ',
                    data: data2,
                    borderColor: '#5e72e4',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y1',
                },
                {
                    label: '2016 NGN ',
                    data: data3,
                    borderColor: '#ff4500',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y2',
                },
                {
                    label: '2017 NGN ',
                    data: data4,
                    borderColor: '#11cdef',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y3',
                },
                {
                    label: '2018 NGN ',
                    data: data5,
                    borderColor: '#2dce89',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y4',
                },
                {
                    label: '2019 NGN ',
                    data: data6,
                    borderColor: '#a52a2a',
                    backgroundColor: '#ffffff',
                    // yAxisID: 'y5',
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        this.ordersChart = new Chart(chartOrders, {
            type: 'line',
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                  }
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
                        var result = f.substring(4, f.length - 3)

                        if (`${item.yLabel}`.includes(".")) {
                            result = item.yLabel;
                        }
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
            data: myData
        });
    }

}