import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { IChartistLineChart } from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          console.log(data.type);
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForLineChartNo(chart:IChartistLineChart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;
      chart.update(chart.data);
      // chart.on('draw', function(data) {
      //   if(data.type === 'line' || data.type === 'area') {
      //     data.element.animate({
      //       d: {
      //         begin: 600,
      //         dur: 700,
      //         from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
      //         to: data.path.clone().stringify(),
      //         easing: Chartist.Svg.Easing.easeOutQuint
      //       }
      //     });
      //   } else if(data.type === 'point') {
      //         seq++;
      //         data.element.animate({
      //           opacity: {
      //             begin: seq * delays,
      //             dur: durations,
      //             from: 0,
      //             to: 1,
      //             easing: 'ease'
      //           }
      //         });
      //     }
      // });

      seq = 0;
  };
  dataCompletedTasksChart:{labels:string[],series:any[]};

  ngOnInit() {

      this.dataCompletedTasksChart = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a',
          '12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a',
          '12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a',
          '12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a',
          '12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a',
          '12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190,
                230, 750, 450, 300, 280, 240, 200, 190,
                230, 750, 450, 300, 280, 240, 200, 190,
                230, 750, 450, 300, 280, 240, 200, 190,
                230, 750, 450, 300, 280, 240, 200, 190,
                230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      const completedTasksChart:IChartistLineChart = new Chartist.Line('#completedTasksChart', this.dataCompletedTasksChart, optionsCompletedTasksChart);
      this.startAnimationForLineChart(completedTasksChart);
      this.randomData();
  }
  low=0;
  high=1000;
  highValue(vertical:number[]){
    let v=vertical[0];
    vertical.filter(d=>{
      v=v>d?v:d;
    });
    return v;
  }
  lowValue(vertical:number[]){
    let v=vertical[0];
    vertical.filter(d=>{
      v=v<d?v:d;
    });
    return v;
  }
  randomData(){
    this.dataCompletedTasksChart.labels.splice(0,1);
    let vertial:number[]=this.dataCompletedTasksChart.series[0];
    vertial.splice(0,1);
    let d=Math.random()*100*Math.random()*10
    vertial.push(d);
    const date=new Date();
    this.dataCompletedTasksChart.labels.push(date.getSeconds()%5==0?(date.getSeconds()==0?date.toTimeString():date.getSeconds()+''):'');
    

     const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: this.lowValue(vertial),
      high: this.highValue(vertial), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
  }
      var completedTasksChart = new Chartist.Line('#completedTasksChart', this.dataCompletedTasksChart, optionsCompletedTasksChart);
      this.startAnimationForLineChartNo(completedTasksChart);
      setTimeout(() => {
        this.randomData();
      }, 1000);
  }

}
