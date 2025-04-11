import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

interface HealthCheckResponse {
  message: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getHealthCheck(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>(this.baseUrl);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/auth/login`, {
      email,
      password,
    });
  }
}
