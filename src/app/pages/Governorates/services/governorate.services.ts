import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { GovernorateSummary } from "../models/governorate.model";

@Injectable({
    providedIn: 'root'
})
export class GovernorateServices {

    private baseUrl: string = 'https://localhost:7177/api/Governorates';
    constructor(private http: HttpClient) {
    }

    getListGovernorates(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    getGovernorateDetails(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}/schools-summary`)
    }

    getGovernorateSummary(governorateId: string): Observable<GovernorateSummary> {
        return this.http.get<GovernorateSummary>(`${this.baseUrl}/${governorateId}/summary`)
    }
}