import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-cities',
    imports:
        [
            RouterModule,
            CommonModule
        ],
    standalone: true,
    templateUrl: './cities.component.html',
    styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit {

    cities: City[] = [];

    ngOnInit(): void {
        this.cities = CITIES;
    }
}


export interface City {
    cityName: string;
    image: string;
    description: string;
    schoolCount: number;
    govermentName: string;
}
export const CITIES: City[] = [
    {
        cityName: "دمشق",
        image: "assets/school2.jpg",
        description: "عاصمة سوريا وأكبر مدنها",
        schoolCount: 120,
        govermentName: "محافظة دمشق"
    },
    {
        cityName: "حلب",
        image: "assets/school2.jpg",
        description: "مدينة تاريخية شمال سوريا",
        schoolCount: 95,
        govermentName: "محافظة حلب"
    },
    {
        cityName: "حمص",
        image: "assets/school2.jpg",
        description: "مدينة وسط سوريا مشهورة بالصناعة",
        schoolCount: 60,
        govermentName: "محافظة حمص"
    },
    {
        cityName: "اللاذقية",
        image: "assets/school2.jpg",
        description: "مدينة ساحلية على البحر المتوسط",
        schoolCount: 45,
        govermentName: "محافظة اللاذقية"
    }
];
