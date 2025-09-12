import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { JsonData } from '../Governorates/models/governorate.model';
import { MatIconModule } from '@angular/material/icon';
import { getUserInfo } from '../../functions/getUserInfo';
import { SchoolStatisticsDto } from './models/home.model';
import { SchoolsServices } from '../schools/services/schools.services';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoggedin: boolean = false;
  dashboardData!: SchoolStatisticsDto;

  constructor(
    private router: Router,
    private schoolService:SchoolsServices
  ) { }

  // القيم النهائية
  endStats = {
    totalSchools: 287,
    coveredSchools: 112,
    damagedSchools: 175,
    donors: 33
  };

  // القيم التي ستظهر على الشاشة (تبدأ من 0)
  displayStats = {
    totalSchools: 0,
    coveredSchools: 0,
    damagedSchools: 0,
    donors: 0
  };

  ngOnInit(): void {
    this.getDashboardData();
    
    // this.createChart();
    // this.createBarChart();
    const userInfo = getUserInfo();
    userInfo ? this.isLoggedin = true : this.isLoggedin = false;
    
  }

  getDashboardData() {
    this.schoolService.getDashboardData().subscribe(res=>{
      this.dashboardData = res;
      
      this.endStats = this.dashboardData.schoolStatistics;
      // console.log('dashb', res.schoolStatistics)
      this.animateValue('totalSchools', this.endStats.totalSchools, 1500);
      this.animateValue('coveredSchools', this.endStats.coveredSchools, 1500);
      this.animateValue('damagedSchools', this.endStats.damagedSchools, 1500);
      this.animateValue('donors', this.endStats.donors, 1500);

      this.createChart();
      this.createBarChart();
    })
  }

  fakeGovernorates: any = new JsonData;
  stats = {
    covered: 112,
    damaged: 175
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
    // setTimeout(() => {
    //   this.createChart();
    //   this.createBarChart();
    // }, 1500);
  }

  redirctToSchools() {
    this.router.navigateByUrl('/schools')
  }

  // المدارس المغطاة
  createChart() {
    // console.log(this.dashboardData.schoolStatistics.damagedSchools)
    // this.dashboardData.schoolStatistics.damagedSchools;
    new Chart('schoolsChart', {
      type: 'doughnut',
      data: {
        labels: ['مدارس تم تغطيتها', 'مدارس متضررة'],
        datasets: [{
          data: [this.dashboardData.schoolStatistics.coveredSchools, this.dashboardData.schoolStatistics.damagedSchools],
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

  //  عدد المدارس المغطاة في كل محافظة
  createBarChart() {
    console.log('array', this.dashboardData.statisticsByGovernorate)
    const stats: any = this.dashboardData.statisticsByGovernorate;

    const labels = stats.map((g: any) => g.governorateName);
    const coveredPerGov = stats.map((g: any) => g.coveredSchools);
    const damagedPerGov = stats.map((g: any) => g.damagedSchools);

    new Chart('schoolsBar', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'مدارس مغطاة',
            data: coveredPerGov,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            tension: 0.4, // انسيابية
            fill: true,   // تلوين تحت الخط
            pointBackgroundColor: '#4caf50',
            pointBorderColor: '#fff',
            pointRadius: 5
          },
          {
            label: 'مدارس متضررة',
            data: damagedPerGov,
            borderColor: '#007bff',
            backgroundColor: 'rgba(54, 108, 244, 0.2)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          x: {
            ticks: { font: { size: 12 } }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  animateValue(key: keyof typeof this.displayStats, end: number, duration: number) {
    let start = 0;
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
      start += 1;
      this.displayStats[key] = start;
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
