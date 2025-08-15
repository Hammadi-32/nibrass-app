import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CityDetails } from "../../cities/models/cities.model";

@Component({
    selector: 'app-shared-cities',
    imports:
        [
            RouterModule,
            CommonModule
        ],
    standalone: true,
    templateUrl: './cities.component.html',
    styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit, OnChanges {

    @Input() cities: CityDetails[] = [];

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['cities'] && !changes['cities'].firstChange) {
            this.cities = changes['cities'].currentValue
        }
    }

}