import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "http://localhost:5005";

  constructor(private http: HttpClient) {}

  getHealthCheck(): Observable<{ message: string }> {
    // Specify the expected response type
    return this.http.get<{ message: string }>(this.baseUrl); // Remove responseType: 'text'
  }
}
