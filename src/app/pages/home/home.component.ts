import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { JsonData } from '../Governorates/models/governorate.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, MatIconModule, RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private router: Router){}

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
    this.animateValue('totalSchools', this.endStats.totalSchools, 1500);
    this.animateValue('coveredSchools', this.endStats.coveredSchools, 1500);
    this.animateValue('damagedSchools', this.endStats.damagedSchools, 1500);
    this.animateValue('donors', this.endStats.donors, 1500);
    // this.createChart();
    // this.createBarChart();
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
    setTimeout(() => {
      this.createChart();
      this.createBarChart();
    }, 1500);
  }

  redirctToSchools(){
    this.router.navigateByUrl('/schools')
  }

  // المدارس المغطاة
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

  //  عدد المدارس المغطاة في كل محافظة
  createBarChart() {
    const coveredPerGov = this.fakeGovernorates.FakeGovernorates.map(() => Math.floor(Math.random() * 20));
    const damagedPerGov = this.fakeGovernorates.FakeGovernorates.map(() => Math.floor(Math.random() * 20));

    new Chart('schoolsBar', {
      type: 'line',
      data: {
        labels: this.fakeGovernorates.FakeGovernorates.map((g:any) => g.nameAr),
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
