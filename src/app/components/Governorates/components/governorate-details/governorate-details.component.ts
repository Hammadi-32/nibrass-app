import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GovernorateServices } from '../../services/governorate.services';
import { ActivatedRoute } from '@angular/router';
import { Governorates } from '../../models/governorate.model';

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

  governorateIdRout: string = '';
  governorate!: Governorates;
  constructor(private governorateServices: GovernorateServices,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.governorateIdRout = params['governorateId'];
    });
    this.getGovernorateDetails();
  }

  getGovernorateDetails() {
    this.governorateServices.getGovernorateDetails(this.governorateIdRout).subscribe(res => {
      this.governorate = res;
    })
  }
}
