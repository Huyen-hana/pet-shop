// import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AppconfigService } from '../../../../services/appconfig-service/appconfig-service';
import { DesignerService } from '../../../../services/designer-service/designer-service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './bar-chart.html',
  styleUrls: ['./bar-chart.scss']
})
export class BarChart implements OnInit {
  @Input() options: any;
  
  data: any;

  platformId = inject(PLATFORM_ID);

  configService = inject(AppconfigService);
  designerService = inject(DesignerService);

  constructor(private cd: ChangeDetectorRef) {};

  themeEffect = effect(() => {
      if (this.configService.transitionComplete()) {
          if (this.designerService.preset()) {
              this.initChart();
          }
      }
  });

  ngOnInit() {
      this.initChart();
      
      window.addEventListener('resize', this.onResize.bind(this));
  };
  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  };

  onResize() {
    this.initChart();
  };

  initChart() {
      if (isPlatformBrowser(this.platformId)) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--p-text-color');
          const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
          const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

          const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
          const getRandomValues = () => labels.map(() => Math.floor(Math.random() * 100));

          this.data = {
              labels: labels,
              datasets: [
                  {
                      type: 'bar',
                      label: 'Dataset 1',
                      backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                      // data: getRandomValues()
                      data: [50, 25, 12, 48, 90, 76, 42]
                  },
                  {
                      type: 'bar',
                      label: 'Dataset 2',
                      backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                      data: [21, 84, 24, 75, 37, 65, 34]
                  },
                  {
                      type: 'bar',
                      label: 'Dataset 3',
                      backgroundColor: documentStyle.getPropertyValue('--p-primary-100'),
                      data: getRandomValues()
                  }
              ]
          };

          this.options = {
              maintainAspectRatio: false,
              aspectRatio: 0.8,
              plugins: {
                  tooltip: {
                      mode: 'index',
                      intersect: false
                  },
                  legend: {
                      labels: {
                          color: textColor
                      }
                  }
              },
              scales: {
                  x: {
                      stacked: true,
                      ticks: {
                          color: textColorSecondary
                      },
                      grid: {
                          color: surfaceBorder,
                          drawBorder: false
                      }
                  },
                  y: {
                      stacked: true,
                      ticks: {
                          color: textColorSecondary
                      },
                      grid: {
                          color: surfaceBorder,
                          drawBorder: false
                      }
                  }
              }
          };
          this.cd.markForCheck()
      }
  }
}
