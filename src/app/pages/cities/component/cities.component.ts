import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
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
export class CitiesComponent {

}