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
        { "name": "health", "options": ["Total confirmed covid-19 cases", "Total confirmed deaths", "Vaccination logistics expenditure", "FGN Covid-19 support to state"] },
        { "name": "demography" , "options": ["Life Expectancy", "Share of population living in extreme poverty", "Population density", "Total population"] },
        { "name": "economy" , "options": ["Revenue Analysis", "6-Year Growth Analyis", "Structure of State Available Revenue", "2019 Ability to meet Recurrent Expenditure", "Actual Expenditure 2019", "Health Budget", "Actual Capital Expenditure", "Total Debt", "Debt Stock 2019", "Debt Growth", "Debt Size"] },
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
            this.viewChartForGeneral("Total confirmed covid-19 cases")
            return
        }
        if(evt.target.value === "Total confirmed deaths") {
            this.data = new DummyData().mapData.map((val) => val.death)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Total confirmed deaths")
            return
        }
        if(evt.target.value === "Share of population living in extreme poverty") {
            this.source = "Source: Statista"
            this.data = new DummyData().mapData.map((val) => val.poverty)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Share of population living in extreme poverty")
            return
        }
        if(evt.target.value === "Total population") {
            this.data = new DummyData().mapData.map((val) => val.population)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Total population")
            return
        }
        if(evt.target.value === "Vaccination logistics expenditure") {
            this.source = "Source: NPHCDA"
            this.data = new DummyData().mapData.map((val) => val.cost)
            this.ordersChart.destroy()
            this.viewChartForGeneral("Vaccination logistics expenditure")
            return
        }
        if(evt.target.value === "FGN Covid-19 support to state") {
            this.source = "Source: Federal Ministry of Finance, Presidential Task Force, UN, DPG-H, NCDC"
            this.data = new DummyData().mapData.map((val) => val.covid_support)
            this.ordersChart.destroy()
            this.viewChartForGeneral("FGN Covid-19 support to state")
            return
        }

        //For Economy
        if(evt.target.value === "Revenue Analysis") {
            this.source = "Source: Budgit"
            const data1 = economicData.map((val) => val.Revenue_Analysis_IGR)
            const data2 = economicData.map((val) => val.Revenue_Analysis_Net_FACC)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Revenue Analysis[2014 - 2019] - IGR (NGN)","Revenue Analysis[2014 - 2019] - NET FACC (NGN)",data1,data2, false)
            return
        }

        if(evt.target.value === "6-Year Growth Analyis") {
            this.source = "Source: Budgit"
            const data1 = economicData2.map((val) => val.Year_Growth_Analyis_IGR)
            const data2 = economicData2.map((val) => val.Year_Growth_Analyis_Net_FACC)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("6-Year Growth Analyis[2014 - 2019] - IGR (%)", "6-Year Growth Analyis[2014 - 2019] - NET FACC (%)",data1,data2, true)
            return
        }

        if(evt.target.value === "Structure of State Available Revenue") {
            this.source = "Source: Budgit"
            const data1 = economicData2.map((val) => val.Structure_of_State_Available_Revenue_IGR)
            const data2 = economicData2.map((val) => val.Structure_of_State_Available_Revenue_Net_FACC)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Structure of State Available Revenue[2019] - IGR (%)", "Structure of State Available Revenue[2019] - NET FACC (%)",data1,data2, true)
            return
        }

        if(evt.target.value === "2019 Ability to meet Recurrent Expenditure") {
            this.source = "Source: Budgit"
            const data1 = economicData.map((val) => val.Ability_to_meet_Recurrent_Expenditure_total_revenue)
            const data2 = economicData.map((val) => val.Ability_to_meet_Recurrent_Expenditure_recurrent_expenditure)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Total Revenue (NGN)","Recurrent Expenditure (NGN)",data1,data2, false)
            return
        }

        if(evt.target.value === "Actual Expenditure 2019") {
            this.source = "Source: Budgit"
            const data1 = economicData.map((val) => val.Actual_Expenditure_2019_Capital_Expenditure)
            const data2 = economicData.map((val) => val.Actual_Expenditure_2019_Recurrent_Expenditure)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Capital Expenditure (NGN)","Recurrent Expenditure (NGN)",data1,data2, false)
            return
        }
        if(evt.target.value === "Health Budget") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Health_Budget_per_capita)
            this.ordersChart.destroy()
            this.viewChartForEconomy("Health Budget (per capita) - NGN")
            return
        }
        if(evt.target.value === "Actual Capital Expenditure") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Actual_Capital_Expenditure_per_capita)
            this.ordersChart.destroy()
            this.viewChartForEconomy("Actual Capital Expenditure (per capita) - NGN")
            return
        }
        if(evt.target.value === "Total Debt") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Total_Debt_per_capita)
            this.ordersChart.destroy()
            this.viewChartForEconomy("Total Debt (per capita) - NGN")
            return
        }
        if(evt.target.value === "Debt Stock 2019") {
            this.source = "Source: Budgit"
            const data1 = economicData.map((val) => val.Debt_Stock_2019_Domestic_Debt)
            const data2 = economicData.map((val) => val.Debt_Stock_2019_External_Debt)
            this.ordersChart.destroy()
            // this.viewChartForEconomy("Revenue Analysis (IGR - 2019)")
            this.viewChartForEconomyStacked("Domestic Debt (NGN)","External Debt (USD)",data1,data2, false)
            return
        }
        if(evt.target.value === "Debt Growth") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Debt_Growth)
            this.ordersChart.destroy()
            this.viewChartForEconomy("Debt Growth[2014 - 2019] (%)")
            return
        }
        if(evt.target.value === "Debt Size") {
            this.source = "Source: Budgit"
            this.data = economicData.map((val) => val.Debt_Size)
            this.ordersChart.destroy()
            this.viewChartForEconomy("Debt Size (position)")
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
        this.viewChartForGeneral("Total confirmed covid-19 cases")
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
            responsive: true,
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

    viewChartForGeneral(title:string) {
        const myData = {
            labels: this.dataAxis,
            datasets: [
                {
                    label: title,
                    data: this.data,
                    borderColor: "#00ffd9",
                    backgroundColor: "#00ffd9",
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

    viewChartForEconomy(title:string) {
        const myData = {
            labels: economicData.map((val) => val.x),
            datasets: [
                {
                    label: title,
                    data: this.data,
                    borderColor: "#00ffd9",
                    backgroundColor: "#00ffd9",
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

    viewChartForEconomyStacked(title1:string, title2:string, data1:any, data2:any, isPercent:boolean) {
        const myData = {
            labels: economicData.map((val) => val.x),
            datasets: [
                {
                    label: title1,
                    data: data1,
                    borderColor: "#00ffd9",
                    backgroundColor: "#00ffd9",
                },
                {
                    label: title2,
                    data: data2,
                    borderColor: "#081248",
                    backgroundColor: "#081248",
                }
            ]
        }
        var chartOrders = document.getElementById('chart-opts');
        // parseOptions(Chart, chartOptions())
        this.ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options: (isPercent) ? this.economyChartStackedPercentage.options : this.economyChartStacked.options,
            data: myData
        });
        // ordersChart.update();
    }

}