import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private url: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserInfoById(userId: string): Observable<any> {
    return this.http.get(`${this.url}/User/${userId}`)
  }
}