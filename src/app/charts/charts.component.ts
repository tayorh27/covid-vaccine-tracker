import { Component, OnInit } from "@angular/core";
import { EChartsOption } from "echarts";
import LinearGradient from 'zrender/lib/graphic/LinearGradient';

@Component({
    selector: 'charts-root',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.css'],
})

export class ChartComponent implements OnInit {

    options: any;

    ngOnInit() {
        const dataAxis = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
        ];
        const data = [
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
        const yMax = 500;
        const dataShadow = [];

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.length; i++) {
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
                data: dataAxis,
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
                    type: 'inside',
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
                        color: new LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' },
                        ]),
                    },
                    emphasis: {
                        itemStyle: {
                            color: new LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#2378f7' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' },
                            ]),
                        }
                    },
                    data,
                },
            ],
        };
    }

    onChartEvent(event: any, type: string) {
        console.log('chart event:', type, event);
    }

    chartOption: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
            },
        ],
    };

}