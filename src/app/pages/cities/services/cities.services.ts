import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CityDetails } from "../models/cities.model";

@Injectable({
    providedIn: 'root'
})
export class CitiesService {
    private baseURL: string = 'https://localhost:7177/api/Cities'
    constructor(private http: HttpClient) {
    }

    getAllCities(): Observable<CityDetails[]> {
        return this.http.get<CityDetails[]>(this.baseURL)
    }

    getCitiesByGovernorateId(governoratesId: string): Observable<CityDetails[]> {
        return this.http.get<CityDetails[]>(`${this.baseURL}/governorates/${governoratesId}/cities`)
    }
}