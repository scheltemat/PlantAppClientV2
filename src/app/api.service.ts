import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface HealthCheckResponse {
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "http://localhost:5000";

  constructor(private http: HttpClient) {}

  getHealthCheck(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>(this.baseUrl);
  }
}
