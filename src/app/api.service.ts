import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

interface HealthCheckResponse {
  message: string;
}

interface LoginResponse {
  token: string;
}

interface PlantData {
  key: string;
  value: string;
}

interface Plant {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  images: {
    thumb: string;
    title: string;
  };
  data: PlantData[];
}

interface PlantSearchResponse {
  plants: Plant[];
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwt_token");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getHealthCheck(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>(this.baseUrl);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/auth/login`, {
      email,
      password,
    });
  }

  searchPlants(query: string): Observable<PlantSearchResponse> {
    return this.http.get<PlantSearchResponse>(
      `${this.baseUrl}/api/external/plants/search`,
      {
        params: { query: query.trim() },
        headers: this.getAuthHeaders(),
      }
    );
  }

  addPlantToGarden(plantId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/user/garden`,
      { plantId },
      { headers: this.getAuthHeaders() }
    );
  }
}
