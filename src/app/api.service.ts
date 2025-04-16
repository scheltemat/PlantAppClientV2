import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

// Response from backend health check
interface HealthCheckResponse {
  message: string;
}

// Auth response
interface LoginResponse {
  token: string;
}

// Metadata for external plant data
interface PlantData {
  key: string;
  value: string;
}

// Returned when searching external plants
export interface ExternalPlant {
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

// Payload to add plant to garden
export interface AddPlantRequest {
  id: number; // Permapeople ID
  name: string;
  imageUrl: string;
}

// Returned from user's garden
export interface UserPlant {
  id: number; // Local DB ID
  permapeopleId: number;
  name: string;
  imageUrl: string;
}

// Search API response structure
interface PlantSearchResponse {
  plants: ExternalPlant[];
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

  getUserPlants(): Observable<UserPlant[]> {
    return this.http.get<UserPlant[]>(`${this.baseUrl}/api/user-plants`, {
      headers: this.getAuthHeaders(),
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

  addPlantToGarden(plant: AddPlantRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user-plants`, plant, {
      headers: this.getAuthHeaders(),
    });
  }
}
