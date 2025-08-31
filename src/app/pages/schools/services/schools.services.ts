import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CreateSchool, School } from "../schools-models/schools.model";

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

    addSchool(schoolData: CreateSchool): Observable<any> {
        const formData = new FormData();

        formData.append('nameAr', schoolData.nameAr);
        formData.append('nameEn', schoolData.nameEn);
        formData.append('city', schoolData.city);
        formData.append('description', schoolData.description);
        formData.append('estimatedRenovationCost', schoolData.estimatedRenovationCost.toString());
        formData.append('governorateId', schoolData.governorateId);
        formData.append('userId', schoolData.userId);
        formData.append('headTeacherName', schoolData.headTeacherName);
        formData.append('headTeacherNumber', schoolData.headTeacherNumber.toString());

        schoolData.needs.forEach((need: string) => {
            formData.append('needs', need);
        });

        if (schoolData.schoolImageBase64) {
            formData.append('schoolImageBase64', schoolData.schoolImageBase64);
        }

        return this.http.post(this.baseUrl, formData);
    }

    deleteSchool(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`)
    }

    getSchoolById(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    updateSchool(data: any) {
        return this.http.put(`${this.baseUrl}`, data)
    }

    getNonApprovedSchools():Observable<School[]> {
        return this.http.get<School[]>(`${this.baseUrl}/non-approved-schools`)
    }
}