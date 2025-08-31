import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export interface authInfo {
  email: string;
  password: string;
}

export interface newUser {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  private url: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserInfoById(userId: string): Observable<any> {
    return this.http.get(`${this.url}/User/${userId}`)
  }

  auth(info: authInfo): Observable<any> {
    return this.http.post(`${this.url}/User/authenticate`,info)
  }

  register(info: newUser): Observable<any> {
    return this.http.post(`${this.url}/User?Username=${info.userName}&Email=${info.email}&Password=${info.password}&FullName=${info.fullName}`,{});
  }
}