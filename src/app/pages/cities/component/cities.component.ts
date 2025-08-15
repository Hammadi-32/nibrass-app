import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CityDetails } from "../models/cities.model";
import { CitiesComponent } from "../../shared/component/cities.component";
import { CitiesService } from "../services/cities.services";

@Component({
    selector: 'app-cities',
    imports:
        [
            RouterModule,
            CommonModule,
            CitiesComponent
        ],
    standalone: true,
    templateUrl: './cities.component.html',
    styleUrl: './cities.component.scss'
})
export class CitiesListComponent implements OnInit {

    cities: CityDetails[] = [];

    constructor
        (
            private citiesService: CitiesService,
        ) { }

    ngOnInit(): void {

        this.getCities();
    }

    getCities() {
        this.citiesService.getAllCities().subscribe(res => {
            this.cities = res;
        })
    }
}
