import { Component, OnInit } from '@angular/core';
import { CitiesComponent } from "../../shared/component/cities.component";
import { CityDetails } from '../models/cities.model';
import { CitiesService } from '../services/cities.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-governorate-cities-list-component',
  imports:
    [
      CitiesComponent

    ],
  templateUrl: './governorate-cities-list-component.component.html',
  styleUrl: './governorate-cities-list-component.component.scss',
  standalone: true
})
export class GovernorateCitiesListComponentComponent implements OnInit {

  cities: CityDetails[] = [];
  governorateIdRout: string = '';

  constructor
    (
      private citiesService: CitiesService,
      private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.governorateIdRout = params['governorateId'];
    });
    this.getCities();
  }

  getCities() {
    this.citiesService.getCitiesByGovernorateId(this.governorateIdRout).subscribe(res => {
      this.cities = res;
    })
  }
}
