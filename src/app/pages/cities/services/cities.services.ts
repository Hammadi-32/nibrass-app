import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CityDetails } from "../models/cities.model";
import { environment } from "../../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class CitiesService {
    private url: string = environment.apiUrl;
    constructor(private http: HttpClient) {
    }

    getAllCities(): Observable<CityDetails[]> {
        return this.http.get<CityDetails[]>(`${this.url}/Cities`)
    }

    getCitiesByGovernorateId(governoratesId: string): Observable<CityDetails[]> {
        return this.http.get<CityDetails[]>(`${this.url}/Cities/governorates/${governoratesId}/cities`)
    }
}