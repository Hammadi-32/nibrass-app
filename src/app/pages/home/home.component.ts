import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router){}

  stats = {
    covered: 12,
    damaged: 8
  };

  sampleSchools = [
    {
      name: 'مدرسة الأمل',
      province: 'إدلب',
      city: 'معرة مصرين',
      needs: ['6 نوافذ', '4 أبواب', '15 طاولة'],
      image: 'assets/school1.jpeg'
    },
    {
      name: 'مدرسة النور',
      province: 'ريف دمشق',
      city: 'حرستا',
      needs: ['10 مقاعد', 'سبورة', 'بلاط'],
      image: 'assets/school2.jpg'
    }
  ];

  ngAfterViewInit(): void {
    this.createChart();
  }

  redirctToSchools(){
    this.router.navigateByUrl('/schools')
  }

  createChart() {
    new Chart('schoolsChart', {
      type: 'doughnut',
      data: {
        labels: ['مدارس تم تغطيتها', 'مدارس متضررة'],
        datasets: [{
          data: [this.stats.covered, this.stats.damaged],
          backgroundColor: ['#4caf50', '#007bff'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }
}
