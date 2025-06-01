import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

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
}