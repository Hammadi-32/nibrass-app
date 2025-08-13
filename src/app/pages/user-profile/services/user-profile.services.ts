import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user-profile.model";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class UserProfileService {
    private baseURL: string = 'https://localhost:7177/api/User'
    constructor(private http: HttpClient) {
    }

    getUserData(userId: string): Observable<User> {
        return this.http.get<User>(`${this.baseURL}/${userId}`)
    }
}