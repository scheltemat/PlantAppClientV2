import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

// Response from backend health check
interface HealthCheckResponse {
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class HealthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
  getHealthCheck(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>(this.baseUrl);
  }
}
