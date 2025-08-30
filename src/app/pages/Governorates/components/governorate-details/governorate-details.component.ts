import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GovernorateServices } from '../../services/governorate.services';
import { GovernorateSummary } from '../../models/governorate.model';
import { Chart } from 'chart.js/auto';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-governorate-details',
  imports:
    [
      CommonModule,
      RouterModule,

    ],
  templateUrl: './governorate-details.component.html',
  styleUrl: './governorate-details.component.scss',
  standalone: true

})
export class GovernorateDetailsComponent implements OnInit {

  governorate!: GovernorateSummary;
  governorateIdRout: string = '';
  constructor
    (
      private governorateServices: GovernorateServices,
      private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.governorateIdRout = params['governorateId'];
    });
    this.getGovernorateSummary();
  }

  getGovernorateSummary() {
    this.governorateServices.getGovernorateSummary(this.governorateIdRout).subscribe(res => {
      this.governorate = res;
      console.log('govern: ', this.governorate)
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderCharts()
    }, 2000);
  }

  renderCharts() {
    new Chart(document.getElementById('schoolsCoverageChart') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: ['مدارس تم تغطيتها', 'مدارس متبقية'],
        datasets: [{
          data: [this.governorate.schoolsCoverage?.[0].value, this.governorate.schoolsCoverage?.[1].value],
          backgroundColor: ['#28a745', '#dcdcdc']
        }]
      }
    });

    new Chart(document.getElementById('citiesCoverageChart') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: ['مدن تم تغطيتها', 'مدن متبقية'],
        datasets: [{
          data: [this.governorate.citiesCoverage?.[0].value, this.governorate.citiesCoverage?.[1].value],
          backgroundColor: ['#007bff', '#dcdcdc']
        }]
      }
    });

    new Chart(document.getElementById('damageChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: ['مدارس خارج الخدمة', 'مدارس تعمل'],
        datasets: [{
          data: [this.governorate.damageChart?.[0].value, this.governorate.damageChart?.[1].value],
          backgroundColor: ['#007bff', '#28a745']
        }]
      }
    });
  }

}
