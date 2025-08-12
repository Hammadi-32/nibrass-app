import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GovernorateServices } from '../../services/governorate.services';
import { ActivatedRoute } from '@angular/router';
import { Governorates } from '../../models/governorate.model';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-governorate-details',
  imports:
    [
      CommonModule
    ],
  templateUrl: './governorate-details.component.html',
  styleUrl: './governorate-details.component.scss',
  standalone: true

})
export class GovernorateDetailsComponent implements OnInit {

  governorate: any;

  // أرقام الإحصائيات
  totalSchools = 0;
  coveredSchools = 0;
  totalCities = 0;
  coveredCities = 0;
  damagePercentage = 0;

  ngOnInit() {
    // بيانات تجريبية
    this.governorate = {
      nameEn: "Damascus",
      totalSchoolCount: 30,
      totalCityCount: 8,
      coveredSchoolCount: 18,
      coveredCityCount: 5,
      damagedSchools: 7 // عدد المدارس المتضررة
    };

    // الحسابات
    this.totalSchools = this.governorate.totalSchoolCount;
    this.coveredSchools = this.governorate.coveredSchoolCount;
    this.totalCities = this.governorate.totalCityCount;
    this.coveredCities = this.governorate.coveredCityCount;

    // النسبة المئوية للضرر
    this.damagePercentage = (this.governorate.damagedSchools / this.totalSchools) * 100;

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderCharts()
    }, 2000);

  }

  renderCharts() {
    // Chart المدارس المغطاة
    new Chart(document.getElementById('schoolsCoverageChart') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: ['Covered Schools', 'Remaining Schools'],
        datasets: [{
          data: [this.coveredSchools, this.totalSchools - this.coveredSchools],
          backgroundColor: ['#28a745', '#dcdcdc']
        }]
      }
    });

    // Chart المدن المغطاة
    new Chart(document.getElementById('citiesCoverageChart') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: ['Covered Cities', 'Remaining Cities'],
        datasets: [{
          data: [this.coveredCities, this.totalCities - this.coveredCities],
          backgroundColor: ['#007bff', '#dcdcdc']
        }]
      }
    });

    new Chart(document.getElementById('damageChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: ['Damaged Schools', 'Undamaged Schools'],
        datasets: [{
          data: [this.governorate.damagedSchools, this.totalSchools - this.governorate.damagedSchools],
          backgroundColor: ['#dc3545', '#28a745']
        }]
      }
    });
  }

}
