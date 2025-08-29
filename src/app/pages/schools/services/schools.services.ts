import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
// import { GovernorateSummary } from "../models/governorate.model";

@Injectable({
    providedIn: 'root'
})
export class SchoolsServices {

    private baseUrl: string = 'https://localhost:7177/api/Schools';
    constructor(private http: HttpClient) {
    }

    getSchoolss(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    addSchool(schoolData: any): Observable<any> {
        return this.http.post(this.baseUrl, schoolData);
    }
}